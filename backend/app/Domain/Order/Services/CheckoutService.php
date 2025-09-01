<?php

namespace App\Domain\Order\Services;

use App\Domain\Cart\Models\Cart;
use App\Domain\Catalog\Models\Product;
use App\Domain\Order\Models\Order;
use App\Domain\Order\Models\OrderItem;
use App\Domain\Order\Models\Coupon;
use App\Domain\Store\Services\ZoneService;
use App\Domain\Addressing\Models\UserAddress;
use App\Domain\Order\Services\CouponService;
use App\Domain\Order\Services\InventoryReservationService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;

class CheckoutService
{
    public function __construct(
        protected CouponService $couponService,
        protected ZoneService $zoneService,
        protected InventoryReservationService $reservations
    ) {}

    public function checkout(int $userId, ?int $addressId = null, ?string $couponCode = null, ?string $notes = null): Order
    {
        /** @var Cart|null $cart */
        $cart = Cart::where('user_id', $userId)->with('items.product')->first();
        if (!$cart || $cart->items->isEmpty()) {
            throw new RuntimeException('Cart is empty');
        }

        $currency = 'LBP';
        $subtotal = 0;

        // Pre-calc subtotal & ensure products are active
        foreach ($cart->items as $item) {
            $product = $item->product;
            if (!$product || !$product->is_active) {
                throw new RuntimeException("Product {$product?->name} is inactive or missing.");
            }
            $unit = (int) ($product->sale_price ?? $product->price);
            $subtotal += $unit * (int) $item->qty;
        }

        // Delivery fee by address/zone (optional)
        $deliveryFee = 0;
        if ($addressId) {
            $address = UserAddress::where('user_id', $userId)->findOrFail($addressId);
            $deliveryFee = $this->zoneService->getFee($address->city ?? '', $address->district ?? null);
        }

        // Coupon handling (validate dates + enforce usage limits right here)
        $coupon = null;
        $discount = 0;
        if ($couponCode) {
            $coupon = Coupon::where('code', strtoupper(trim($couponCode)))->first();
            if ($coupon && !$coupon->isActiveNow()) {
                throw new RuntimeException('Coupon is not active.');
            }
            if ($coupon) {
                if ($coupon->usage_limit) {
                    $used = DB::table('coupon_redemptions')->where('coupon_id', $coupon->id)->count();
                    if ($used >= $coupon->usage_limit) {
                        throw new RuntimeException('Coupon usage limit reached.');
                    }
                }
                if ($coupon->usage_limit_per_user) {
                    $usedByUser = DB::table('coupon_redemptions')
                        ->where('coupon_id', $coupon->id)
                        ->where('user_id', $userId)
                        ->count();
                    if ($usedByUser >= $coupon->usage_limit_per_user) {
                        throw new RuntimeException('You have already used this coupon the maximum number of times.');
                    }
                }

                $apply    = $this->couponService->apply($coupon, $subtotal);
                $discount = $apply['discount'];
            }
        }

        $total = max(0, $subtotal - $discount + $deliveryFee);

        // Reserve inventory up front (temporary hold) to avoid race conditions before payment
        $reservationToken = 'cart_'.$cart->id.'_'.Str::orderedUuid()->toString();
        foreach ($cart->items as $item) {
            if (!$this->reservations->tryReserve($reservationToken, (int)$item->product_id, (int)$item->qty, 900)) {
                $this->reservations->releaseAll($reservationToken);
                throw new RuntimeException("Insufficient stock for {$item->product->name}.");
            }
        }

        try {
            $order = DB::transaction(function () use (
                $cart, $userId, $currency, $subtotal, $deliveryFee, $total,
                $coupon, $couponCode, $discount, $notes
            ) {
                // Create order (NOTE: assumes orders table has columns: coupon_code, discount, notes)
                $order = Order::create([
                    'user_id'      => $userId,
                    'number'       => Str::upper(Str::random(10)),
                    'status'       => 'pending_payment',
                    'currency'     => $currency,
                    'subtotal'     => $subtotal,
                    'delivery_fee' => $deliveryFee,
                    'total'        => $total,
                    'coupon_code'  => $couponCode ?: null,
                    'discount'     => $discount ?: 0,
                    'notes'        => $notes ?: null,
                ]);

                // Create items; atomically decrement stock
                foreach ($cart->items as $item) {
                    $product = $item->product->fresh();
                    $qty     = (int) $item->qty;
                    $unit    = (int) ($product->sale_price ?? $product->price);
                    $line    = $unit * $qty;

                    $affected = Product::where('id', $product->id)
                        ->where('stock', '>=', $qty)
                        ->decrement('stock', $qty);

                    if (!$affected) {
                        throw new RuntimeException("Stock race condition on {$product->name}.");
                    }

                    OrderItem::create([
                        'order_id'    => $order->id,
                        'product_id'  => $product->id,
                        'store_id'    => $product->store_id,
                        'name'        => $product->name,
                        'qty'         => $qty,
                        'unit_price'  => $unit,
                        'currency'    => $product->currency ?? 'LBP',
                        'line_total'  => $line,
                    ]);
                }

                // Record coupon redemption (if any)
                if ($coupon) {
                    DB::table('coupon_redemptions')->insert([
                        'coupon_id'         => $coupon->id,
                        'user_id'           => $userId,
                        'order_id'          => $order->id,
                        'amount_discounted' => $discount,
                        'created_at'        => now(),
                        'updated_at'        => now(),
                    ]);
                }

                // Clear cart
                $cart->items()->delete();
                $cart->touch();

                return $order->load('items');
        });
        } catch (\Throwable $e) {
            // On any failure, release reservations before bubbling the error
            $this->reservations->releaseAll($reservationToken);
            throw $e;
        }

        // Success → reservation no longer needed
        $this->reservations->releaseAll($reservationToken);

        return $order;
    }
}

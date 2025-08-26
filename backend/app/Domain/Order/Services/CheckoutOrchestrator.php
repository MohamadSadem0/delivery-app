<?php

namespace App\Domain\Order\Services;

use App\Domain\Order\Services\CheckoutService;
use App\Domain\Order\Services\InventoryReservationService;
use App\Domain\Order\Services\CouponRedemptionService;
use App\Domain\Order\Models\Coupon;
use Illuminate\Support\Str;
use RuntimeException;

class CheckoutOrchestrator
{
    public function __construct(
        protected CheckoutService $checkout,
        protected InventoryReservationService $reservations,
        protected CouponRedemptionService $redemptions
    ) {}

    /**
     * Wrap checkout with inventory reservation; ensure release on failure.
     *
     * @return \App\Domain\Order\Models\Order
     */
    public function run(int $userId, ?int $addressId, ?string $couponCode, ?string $notes = null, ?string $reservationToken = null)
    {
        $token = $reservationToken ?: 'resv_' . Str::uuid()->toString();

        // Reserve current cart quantities
        $cart = \App\Domain\Cart\Models\Cart::where('user_id', $userId)->with('items.product')->first();
        if (!$cart || $cart->items->isEmpty()) {
            throw new RuntimeException('Cart is empty');
        }

        foreach ($cart->items as $item) {
            $ok = $this->reservations->tryReserve($token, (int)$item->product_id, (int)$item->qty, 900);
            if (!$ok) {
                $this->reservations->releaseAll($token);
                throw new RuntimeException("Insufficient stock for product ID {$item->product_id}");
            }
        }

        // Perform checkout (DB transaction inside)
        try {
            $order = $this->checkout->checkout($userId, $addressId, $couponCode, $notes);

            // If coupon used, record redemption
            if ($couponCode) {
                $coupon = Coupon::where('code', strtoupper(trim($couponCode)))->first();
                if ($coupon && $this->redemptions->canUse($coupon, $userId)) {
                    $subtotal = (int) $order->subtotal;
                    $total = (int) $order->total;
                    $discount = max(0, $subtotal - ($total - (int)$order->delivery_fee));
                    $this->redemptions->redeem($coupon, $userId, $order->id, $discount);
                }
            }

            return $order;
        } catch (\Throwable $e) {
            // Release on failure
            $this->reservations->releaseAll($token);
            throw $e;
        } finally {
            // Release reservations after success too (we decremented DB stock during checkout)
            $this->reservations->releaseAll($token);
        }
    }
}

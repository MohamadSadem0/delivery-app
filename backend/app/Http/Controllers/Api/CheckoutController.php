<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\CheckoutRequest;
use App\Http\Resources\OrderResource;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderStore;
use App\Models\OrderItem;
use App\Services\PricingService;
use App\Services\DeliveryService;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function __construct(private PricingService $pricing, private DeliveryService $delivery) {}

    public function checkout(CheckoutRequest $request)
    {
        $data = $request->validated();
        $user = auth('api')->user();
        $cart = Cart::where('user_id',$user->id)->where('status','ACTIVE')->first();
        if (!$cart) return response()->json(['message'=>'Cart not found'], 404);

        $items = CartItem::where('cart_id',$cart->id)->get();
        if ($items->isEmpty()) return response()->json(['message'=>'Cart empty'], 422);

        return DB::transaction(function () use ($user,$cart,$items,$data) {
            $order = Order::create([
                'user_id' => $user->id,
                'shipping_address_id' => $data['shipping_address_id'] ?? null,
                'currency' => $cart->currency,
                'status' => 'PENDING',
                'subtotal_cents' => 0,
                'shipping_cents' => 0,
                'total_cents' => 0,
            ]);

            $byStore = $items->groupBy('store_id');
            $grandSubtotal = 0;

            foreach ($byStore as $storeId => $storeItems) {
                $subtotal = $storeItems->sum('total_price_cents');
                $os = OrderStore::create([
                    'order_id' => $order->id,
                    'store_id' => $storeId,
                    'fulfillment_type' => $data['fulfillment_type'],
                    'status' => 'PENDING',
                    'items_subtotal_cents' => $subtotal,
                    'delivery_fee_cents' => 0,
                    'total_cents' => $subtotal,
                    'preferred_delivery_user_id' => $data['preferred_delivery_user_id'] ?? null,
                ]);
                foreach ($storeItems as $it) {
                    OrderItem::create([
                        'order_store_id' => $os->id,
                        'product_id' => $it->product_id,
                        'product_variant_id' => $it->product_variant_id,
                        'name' => '',
                        'qty' => $it->qty,
                        'unit_price_cents' => $it->unit_price_cents,
                        'total_price_cents'=> $it->total_price_cents,
                    ]);
                }
                $grandSubtotal += $subtotal;

                // Create delivery record for delivery flow
                if ($data['fulfillment_type'] === 'DELIVERY') {
                    $this->delivery->ensureDeliveryForOrderStore($os);
                }
            }

            $order->subtotal_cents = $grandSubtotal;
            $order->total_cents = $grandSubtotal;
            $order->save();

            $cart->status = 'CHECKED_OUT';
            $cart->save();

            return response()->json(['order' => new OrderResource($order)], 201);
        });
    }
}

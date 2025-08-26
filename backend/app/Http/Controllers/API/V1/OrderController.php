<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Order\Models\Order;
use App\Domain\Order\Models\OrderItem;
use App\Domain\Cart\Models\Cart;
use App\Domain\Catalog\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::query()
            ->where('user_id', auth('api')->id())
            ->latest('id')
            ->with('items')
            ->paginate(20);

        return response()->json($orders);
    }

    public function show(Order $order)
    {
        $this->authorizeOrder($order);
        $order->load('items');
        return response()->json($order);
    }

    public function checkout(Request $request)
    {
        $data = $request->validate([
            'address_id' => ['nullable', 'integer'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $userId = auth('api')->id();
        /** @var Cart $cart */
        $cart = Cart::query()->where('user_id', $userId)->with('items.product')->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 422);
        }

        $currency = 'LBP';
        $subtotal = 0;

        try {
            $order = DB::transaction(function () use ($cart, $userId, $currency, &$subtotal) {
                // Re-validate stock and compute totals
                foreach ($cart->items as $item) {
                    $product = $item->product->fresh(); // latest stock/price
                    $qty = (int) $item->qty;

                    if (!$product->is_active) {
                        throw new \RuntimeException("Product {$product->name} is inactive.");
                    }
                    if ($qty > $product->stock) {
                        throw new \RuntimeException("Insufficient stock for {$product->name}.");
                    }

                    $unit = (int) ($product->sale_price ?? $product->price);
                    $line = $unit * $qty;
                    $subtotal += $line;
                }

                $deliveryFee = 0; // later based on zone
                $total = $subtotal + $deliveryFee;

                $order = Order::create([
                    'user_id' => $userId,
                    'number' => Str::upper(Str::random(10)),
                    'status' => 'pending_payment',
                    'currency' => $currency,
                    'subtotal' => $subtotal,
                    'delivery_fee' => $deliveryFee,
                    'total' => $total,
                ]);

                foreach ($cart->items as $item) {
                    $product = $item->product->fresh();
                    $qty = (int) $item->qty;
                    $unit = (int) ($product->sale_price ?? $product->price);
                    $line = $unit * $qty;

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'store_id' => $product->store_id,
                        'name' => $product->name,
                        'qty' => $qty,
                        'unit_price' => $unit,
                        'currency' => $product->currency ?? 'LBP',
                        'line_total' => $line,
                    ]);

                    // decrement stock
                    $affected = Product::where('id', $product->id)
                        ->where('stock', '>=', $qty)
                        ->decrement('stock', $qty);

                    if (!$affected) {
                        throw new \RuntimeException("Stock race condition on {$product->name}.");
                    }
                }

                // Clear cart
                $cart->items()->delete();
                $cart->touch();

                return $order->load('items');
            });
        } catch (\Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json([
            'message' => 'Order created. Proceed to payment.',
            'order' => $order,
        ], 201);
    }

    protected function authorizeOrder(Order $order): void
    {
        if ($order->user_id !== auth('api')->id()) {
            abort(404);
        }
    }
}

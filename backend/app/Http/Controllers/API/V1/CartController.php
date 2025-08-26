<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cart\AddCartItemRequest;
use App\Http\Requests\Cart\UpdateCartItemRequest;
use App\Http\Resources\Cart\CartResource;
use App\Http\Resources\Cart\CartItemResource;
use App\Domain\Cart\Models\Cart;
use App\Domain\Cart\Models\CartItem;
use App\Domain\Catalog\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    protected function currentCart(): Cart
    {
        $userId = auth('api')->id();
        return Cart::firstOrCreate(['user_id' => $userId], ['currency' => 'LBP']);
    }

    public function show(Request $request)
    {
        $cart = $this->currentCart()->load(['items.product']);
        return new CartResource($cart);
    }

    public function addItem(AddCartItemRequest $request)
    {
        $cart = $this->currentCart();
        $data = $request->validated();

        /** @var \App\Domain\Catalog\Models\Product $product */
        $product = Product::query()->where('is_active', true)->findOrFail($data['product_id']);

        $unit = (int) ($product->sale_price ?? $product->price);
        $item = $cart->items()->firstOrNew([
            'product_id' => $product->id,
        ], [
            'store_id' => $product->store_id,
            'currency' => $product->currency ?? 'LBP',
        ]);

        $newQty = ($item->exists ? $item->qty : 0) + (int) $data['qty'];

        if ($newQty > $product->stock) {
            return response()->json(['message' => 'Insufficient stock'], 422);
        }

        $item->qty = $newQty;
        $item->unit_price = $unit;
        $item->save();

        return new CartItemResource($item->load('product'));
    }

    public function updateItem(UpdateCartItemRequest $request, CartItem $item)
    {
        $cart = $this->currentCart();

        if ($item->cart_id !== $cart->id) {
            abort(404);
        }

        $data = $request->validated();
        $product = $item->product;

        if ($data['qty'] > $product->stock) {
            return response()->json(['message' => 'Insufficient stock'], 422);
        }

        $item->qty = (int) $data['qty'];
        $item->unit_price = (int) ($product->sale_price ?? $product->price);
        $item->save();

        return new CartItemResource($item->load('product'));
    }

    public function removeItem(Request $request, CartItem $item)
    {
        $cart = $this->currentCart();
        if ($item->cart_id !== $cart->id) {
            abort(404);
        }
        $item->delete();
        return response()->json(['message' => 'Item removed']);
    }
}

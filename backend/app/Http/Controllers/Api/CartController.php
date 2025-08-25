<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cart\CartAddItemRequest;
use App\Http\Requests\Cart\CartUpdateItemRequest;
use App\Http\Resources\CartResource;
use App\Http\Resources\CartItemResource;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ProductVariant;

class CartController extends Controller
{
    private function activeCart()
    {
        $user = auth('api')->user();
        return Cart::firstOrCreate(['user_id'=>$user->id,'status'=>'ACTIVE'], ['currency'=>'USD']);
    }

    public function show()
    {
        $cart = $this->activeCart();
        $items = CartItem::where('cart_id',$cart->id)->get();
        return response()->json([
            'cart' => new CartResource($cart),
            'items'=> CartItemResource::collection($items),
        ]);
    }

    public function addItem(CartAddItemRequest $request)
    {
        $cart = $this->activeCart();
        $data = $request->validated();

        $product = Product::findOrFail($data['product_id']);
        $variantId = $data['variant_id'] ?? null;
        $unitCents = 0;
        if ($variantId) {
            $variant = ProductVariant::where('id',$variantId)->where('product_id',$product->id)->firstOrFail();
            $unitCents = (int) $variant->price_cents;
        } else {
            $variant = ProductVariant::where('product_id',$product->id)->orderBy('id')->first();
            $unitCents = $variant ? (int) $variant->price_cents : 0;
        }

        $item = CartItem::create([
            'cart_id' => $cart->id,
            'store_id'=> $product->store_id,
            'product_id'=> $product->id,
            'product_variant_id'=> $variantId,
            'qty'=> $data['qty'],
            'unit_price_cents'=> $unitCents,
            'total_price_cents'=> $unitCents * $data['qty'],
        ]);

        return response()->json(new CartItemResource($item), 201);
    }

    public function updateItem(int $itemId, CartUpdateItemRequest $request)
    {
        $cart = $this->activeCart();
        $item = CartItem::where('id',$itemId)->where('cart_id',$cart->id)->firstOrFail();
        $item->qty = $request->validated()['qty'];
        $item->total_price_cents = $item->unit_price_cents * $item->qty;
        $item->save();
        return response()->json(new CartItemResource($item));
    }

    public function removeItem(int $itemId)
    {
        $cart = $this->activeCart();
        $item = CartItem::where('id',$itemId)->where('cart_id',$cart->id)->firstOrFail();
        $item->delete();
        return response()->json(['message'=>'Removed']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Promo\PromotionApplyRequest;
use App\Models\Cart;
use App\Models\CartItem;
use App\Services\PricingService;
use App\Services\PromotionService;

class PromotionController extends Controller
{
    public function __construct(private PricingService $pricing, private PromotionService $promos) {}

    public function apply(PromotionApplyRequest $request)
    {
        $userId = auth('api')->id();
        $cart = Cart::where('user_id',$userId)->where('status','ACTIVE')->first();
        if (!$cart) return response()->json(['message'=>'Cart not found'], 404);

        $items = CartItem::where('cart_id',$cart->id)->get();
        $summary = $this->pricing->summarizeCartItems($items->all());
        $res = $this->promos->validateAndApply($request->validated()['code'], $summary);

        return response()->json(['summary'=>$summary, 'promo'=>$res]);
    }
}

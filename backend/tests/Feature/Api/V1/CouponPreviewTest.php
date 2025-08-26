<?php

use App\Domain\User\Models\User;
use App\Domain\Catalog\Models\Product;
use App\Domain\Order\Models\Coupon;
use Tymon\JWTAuth\Facades\JWTAuth;

it('previews coupon discount against cart subtotal', function () {
    $user = User::factory()->create();
    $token = JWTAuth::fromUser($user);
    $product = Product::factory()->create(['price'=>10000,'stock'=>10,'is_active'=>true]);

    $this->withHeader('Authorization',"Bearer $token");

    $this->postJson('/api/v1/cart/items',['product_id'=>$product->id,'qty'=>2])->assertCreated();

    Coupon::create(['code'=>'TEST10','type'=>'percent','value'=>10,'is_active'=>true]);

    $resp = $this->getJson('/api/v1/coupons/preview?code=TEST10')->assertOk()->json();
    expect($resp['discount'])->toBeGreaterThan(0);
});

<?php

use App\Domain\User\Models\User;
use App\Domain\Catalog\Models\Product;
use App\Domain\Cart\Models\Cart;
use Tymon\JWTAuth\Facades\JWTAuth;

it('creates an order from cart checkout', function () {
    $user = User::factory()->create();
    $token = JWTAuth::fromUser($user);
    $product = Product::factory()->create(['stock'=>5,'price'=>20000,'is_active'=>true]);

    $this->withHeader('Authorization',"Bearer $token");

    $this->postJson('/api/v1/cart/items',['product_id'=>$product->id,'qty'=>2])->assertCreated();

    $this->postJson('/api/v1/checkout',[])->assertCreated()->assertJsonStructure(['order']);
});

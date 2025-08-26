<?php

use App\Domain\User\Models\User;
use App\Domain\Catalog\Models\Product;
use Tymon\JWTAuth\Facades\JWTAuth;

it('adds a product to cart and updates quantity', function () {
    $user = User::factory()->create();
    $token = JWTAuth::fromUser($user);

    $product = Product::factory()->create(['stock' => 10, 'price' => 10000, 'is_active' => true]);

    $this->withHeader('Authorization', "Bearer $token");

    $this->postJson('/api/v1/cart/items', ['product_id' => $product->id, 'qty' => 2])
        ->assertCreated(201);

    $itemId = \App\Domain\Cart\Models\CartItem::first()->id;

    $this->patchJson("/api/v1/cart/items/{$itemId}", ['qty' => 3])
        ->assertOk();
});

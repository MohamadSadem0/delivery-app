<?php

use App\Domain\User\Models\User;
use App\Domain\Catalog\Models\Product;
use App\Domain\Catalog\Models\Category;

test('authenticated user can add to cart', function () {
    $user = User::factory()->create();
    $token = auth('api')->login($user);

    $cat = Category::factory()->create();
    $product = Product::factory()->create(['category_id' => $cat->id, 'stock' => 5]);

    $resp = $this->withHeader('Authorization', "Bearer $token")
        ->postJson('/api/v1/cart/items', ['product_id' => $product->id, 'qty' => 2]);

    $resp->assertStatus(200)->assertJsonStructure(['product']);
});

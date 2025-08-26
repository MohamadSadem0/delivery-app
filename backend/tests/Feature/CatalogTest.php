<?php

use App\Domain\Catalog\Models\Category;
use App\Domain\Catalog\Models\Product;

test('catalog endpoints return products', function () {
    $cat = Category::factory()->create();
    Product::factory()->create(['category_id' => $cat->id]);

    $resp = $this->getJson('/api/v1/catalog/products');
    $resp->assertStatus(200);
});

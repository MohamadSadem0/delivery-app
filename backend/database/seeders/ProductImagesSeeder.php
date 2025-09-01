<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Domain\Catalog\Models\Product;
use App\Domain\Catalog\Models\ProductImage;

class ProductImagesSeeder extends Seeder
{
    public function run(): void
    {
        $product = Product::first();
        if ($product) {
            ProductImage::firstOrCreate(
                ['product_id' => $product->id, 'path' => 'products/sample.jpg'],
                ['is_primary' => true]
            );
        }
    }
}

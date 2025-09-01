<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Domain\Catalog\Models\Product;
use App\Domain\Catalog\Models\ProductImage;

class ProductImagesTableSeeder extends Seeder
{
    public function run(): void
    {
        foreach (Product::limit(5)->get() as $product) {
            ProductImage::firstOrCreate([
                'product_id' => $product->id,
                'path' => 'products/sample.jpg',
            ], ['is_primary' => true]);
        }
    }
}

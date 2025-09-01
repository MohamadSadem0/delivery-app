<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Domain\Catalog\Models\Product;
use App\Domain\Catalog\Models\Category;
use App\Domain\Store\Models\Store;
use Illuminate\Support\Str;

class ProductsTableSeeder extends Seeder
{
    public function run(): void
    {
        $store = Store::first();
        $cat = Category::first();

        for ($i=1; $i<=20; $i++) {
            $name = "Product $i";
            Product::firstOrCreate(
                ['slug' => Str::slug($name)],
                [
                    'store_id' => $store->id,
                    'category_id' => $cat->id,
                    'name' => $name,
                    'description' => 'Sample product description',
                    'price' => 50000 + ($i * 1000),
                    'sale_price' => ($i % 3 == 0) ? (40000 + ($i * 800)) : null,
                    'currency' => 'LBP',
                    'stock' => 50 + $i,
                    'is_active' => true,
                ]
            );
        }
    }
}

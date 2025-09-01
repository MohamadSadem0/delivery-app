<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Domain\User\Models\User;
use App\Domain\Store\Models\Store;
use App\Domain\Catalog\Models\Category;
use App\Domain\Catalog\Models\Product;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        $vendor = User::factory()->create([
            'name' => 'Demo Vendor',
            'email' => 'vendor@example.com',
            'password' => bcrypt('password'),
            'role' => 'vendor',
        ]);

        $store = Store::create([
            'user_id' => $vendor->id,
            'name' => 'Demo Store',
            'slug' => 'demo-store',
            'description' => 'Example vendor store.',
            'is_active' => true,
        ]);

        $cat = Category::create([
            'name' => 'Electronics',
            'slug' => 'electronics',
            'is_active' => true,
        ]);

        Product::create([
            'store_id' => $store->id,
            'category_id' => $cat->id,
            'name' => 'Demo Phone',
            'slug' => 'demo-phone',
            'description' => 'Example product.',
            'price' => 5000000,
            'currency' => 'LBP',
            'stock' => 20,
            'is_active' => true,
        ]);
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Catalog\Models\Product;
use App\Domain\Catalog\Models\Category;
use App\Domain\Store\Models\Store;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'store_id' => Store::factory(),
            'category_id' => Category::factory(),
            'name' => $this->faker->word,
            'slug' => $this->faker->slug,
            'description' => $this->faker->sentence,
            'price' => $this->faker->numberBetween(10000, 1000000),
            'currency' => 'LBP',
            'stock' => $this->faker->numberBetween(1, 50),
            'is_active' => true,
        ];
    }
}

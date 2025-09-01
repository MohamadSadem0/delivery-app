<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class OrderItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'order_id' => 1,
            'product_id' => 1,
            'qty' => rand(1, 3),
            'price_cents' => rand(5000, 500000),
            'currency' => 'LBP',
        ];
    }
}

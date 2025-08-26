<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class PaymentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'order_id' => 1,
            'method' => 'COD',
            'amount_cents' => rand(10000, 900000),
            'currency' => 'LBP',
            'status' => 'PENDING',
        ];
    }
}

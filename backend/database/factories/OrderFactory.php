<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'store_id' => 1,
            'status' => 'PENDING',
            'total_cents' => rand(10000, 900000),
            'currency' => 'LBP',
            'delivery_address' => 'Beirut, ' . $this->faker->streetAddress(),
            'delivery_zone' => 'BEI',
            'delivery_mode' => 'WAITING_LIST',
            'assignment_status' => 'UNASSIGNED',
            'payment_status' => 'PENDING',
        ];
    }
}

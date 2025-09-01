<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Store\Models\Store;
use App\Domain\User\Models\User;

class StoreFactory extends Factory
{
    protected $model = Store::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->company,
            'slug' => $this->faker->slug,
            'description' => $this->faker->sentence,
            'is_active' => true,
        ];
    }
}

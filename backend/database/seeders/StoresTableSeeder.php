<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Domain\Store\Models\Store;
use App\Domain\User\Models\User;
use Illuminate\Support\Str;

class StoresTableSeeder extends Seeder
{
    public function run(): void
    {
        $owner = User::first();
        foreach (['Beirut Bazaar', 'Tripoli Traders', 'Saida Souk'] as $name) {
            Store::firstOrCreate(
                ['slug' => Str::slug($name)],
                ['user_id' => $owner->id, 'name' => $name, 'description' => 'Demo store in Lebanon', 'is_active' => true]
            );
        }
    }
}

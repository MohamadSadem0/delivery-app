<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Domain\Store\Models\Zone;

class ZonesTableSeeder extends Seeder
{
    public function run(): void
    {
        $zones = [
            ['name' => 'Beirut', 'delivery_fee' => 60000],
            ['name' => 'Mount Lebanon', 'delivery_fee' => 80000],
            ['name' => 'Tripoli', 'delivery_fee' => 90000],
            ['name' => 'Saida', 'delivery_fee' => 90000],
            ['name' => 'Zahle', 'delivery_fee' => 100000],
        ];

        foreach ($zones as $z) {
            Zone::updateOrCreate(['name' => $z['name']], ['delivery_fee' => $z['delivery_fee']]);
        }
    }
}

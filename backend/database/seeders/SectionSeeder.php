<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            ['slug' => 'restaurant', 'name' => 'Restaurant'],
            ['slug' => 'pharmacy',   'name' => 'Pharmacy'],
            ['slug' => 'grocery',    'name' => 'Grocery'],
        ];

        foreach ($sections as $s) {
            \App\Domain\Store\Models\Section::firstOrCreate(
                ['slug' => $s['slug']],
                ['name' => $s['name'], 'is_active' => true]
            );
        }
    }
}

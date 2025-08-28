<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Domain\Store\Models\Section;
use App\Domain\Catalog\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $map = [
            'restaurant' => ['Pizza', 'Pasta', 'Burgers'],
            'pharmacy'   => ['Medicine', 'Supplements', 'Personal Care'],
            'grocery'    => ['Fruits', 'Vegetables', 'Dairy'],
        ];

        foreach ($map as $sectionSlug => $cats) {
            $section = Section::where('slug', $sectionSlug)->first();
            if (!$section) continue;

            foreach ($cats as $name) {
                Category::firstOrCreate(
                    ['section_id' => $section->id, 'slug' => Str::slug($name)],
                    ['name' => $name, 'is_active' => true]
                );
            }
        }
    }
}

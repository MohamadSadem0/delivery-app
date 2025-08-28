<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
        //     StoresTableSeeder::class,
        //     CategoriesTableSeeder::class,
        //     ProductsTableSeeder::class,
        //     ProductImagesTableSeeder::class,
        //  AdminUserSeeder::class,
 SectionSeeder::class,
            CategorySeeder::class,
            AdminUserSeeder::class,
            VendorDemoSeeder::class,
            DemoCatalogSeeder::class,
                ]);
    }
}

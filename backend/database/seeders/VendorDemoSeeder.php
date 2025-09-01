<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Domain\User\Models\User;
use App\Domain\Store\Models\Store;
use App\Domain\Store\Models\Section;
use App\Domain\Catalog\Models\Category;
use App\Domain\Catalog\Models\Product;
use Illuminate\Database\QueryException;

class VendorDemoSeeder extends Seeder
{
    public function run(): void
    {
        // 1) Demo users
        $vendor = User::firstOrCreate(
            ['email' => 'vendor@example.com'],
            [
                'name'         => 'Vendor Guy',
                'password'     => Hash::make('P@ssw0rd123!'),
                'role'         => Schema::hasColumn('users','role') ? 'vendor' : null,
                'country_code' => Schema::hasColumn('users','country_code') ? 'LB' : null,
            ]
        );

        User::firstOrCreate(
            ['email' => 'delivery@example.com'],
            [
                'name'         => 'Delivery Rider',
                'password'     => Hash::make('P@ssw0rd123!'),
                'role'         => Schema::hasColumn('users','role') ? 'delivery' : null,
                'country_code' => Schema::hasColumn('users','country_code') ? 'LB' : null,
            ]
        );

       // 2) Vendor store (Restaurant section)
$section = Section::where('slug','restaurant')->first();
if (!$section) { return; }

// Beirut coords (lon, lat)
$lon = 35.5018;
$lat = 33.8938;

// Base payload
$storeData = [
    'name'                => 'Fast Bites',
    'description'         => 'Quick & tasty meals.',
    'is_active'           => true,
    'supports_delivery'   => true,
    'supports_pickup'     => true,
    'supports_shipping'   => false,
    'commission_rate_bps' => 1500, // 15%
    'section_id'          => $section->id,
];

// If your schema still has NOT NULL `type`, set it
if (Schema::hasColumn('stores', 'type')) {
    $storeData['type'] = 'restaurant';
}

$store = null;

// Try with SRID 4326 first (common for spatial columns)
try {
    $withSrid = array_merge($storeData, [
        'geo_point' => DB::raw("ST_SRID(POINT($lon, $lat), 4326)"),
    ]);

    $store = Model::unguarded(function () use ($vendor, $withSrid) {
        return Store::firstOrCreate(
            ['user_id' => $vendor->id, 'slug' => 'fast-bites'],
            $withSrid
        );
    });

} catch (QueryException $e) {
    // Fallback to plain POINT() (no SRID)
    try {
        $noSrid = array_merge($storeData, [
            'geo_point' => DB::raw("POINT($lon, $lat)"),
        ]);

        $store = Model::unguarded(function () use ($vendor, $noSrid) {
            return Store::firstOrCreate(
                ['user_id' => $vendor->id, 'slug' => 'fast-bites'],
                $noSrid
            );
        });

    } catch (QueryException $e2) {
        // Final fallback for non-spatial columns (string storage)
        $asString = array_merge($storeData, [
            'geo_point' => "$lat,$lon",
        ]);

        $store = Model::unguarded(function () use ($vendor, $asString) {
            return Store::firstOrCreate(
                ['user_id' => $vendor->id, 'slug' => 'fast-bites'],
                $asString
            );
        });
    }
}
    }
}
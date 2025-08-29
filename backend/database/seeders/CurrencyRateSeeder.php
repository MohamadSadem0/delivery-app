<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencyRateSeeder extends Seeder
{
    public function run(): void
    {
        // Upsert-like: insert if not already present today
        $rate = 89000; // sample; replace with your operational rate
        DB::table('currency_rates')->insertOrIgnore([
            'base_currency'  => 'USD',
            'quote_currency' => 'LBP',
            'rate'           => $rate,
            'effective_at'   => now(),
        ]);
    }
}

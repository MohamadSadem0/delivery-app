<?php

return [
    'base' => env('CURRENCY_BASE', 'LBP'),
    // rates: units of base per 1 unit of currency (e.g., 1 USD = 89500 LBP => 'USD' => 89500)
    'rates' => [
        'LBP' => 1,
        'USD' => (int) env('FX_USD_IN_LBP', 89500),
        // add more as needed
    ],
];

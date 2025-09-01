<?php

return [
    // Commission rate applied to vendor gross revenue (0.1 = 10%)
    'commission_rate' => env('PAYOUT_COMMISSION_RATE', 0.10),

    // Minimum net amount before a payout is generated
    'min_payout_amount' => (int) env('PAYOUT_MIN_AMOUNT', 100000),
];

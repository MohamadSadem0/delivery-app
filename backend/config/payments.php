<?php

return [
    'default_provider' => env('PAYMENT_DEFAULT_PROVIDER', 'stripe'),

    'webhooks' => [
        'skip_verification' => (bool) env('PAYMENT_WEBHOOK_SKIP_VERIFY', false),
    ],

    'providers' => [
        'stripe' => ['webhook_secret' => env('STRIPE_WEBHOOK_SECRET', '')],
        'tap'    => ['webhook_secret' => env('TAP_WEBHOOK_SECRET', '')],
        'hyperpay' => ['webhook_secret' => env('HYPERPAY_WEBHOOK_SECRET', '')],
    ],
];

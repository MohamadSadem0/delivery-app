<?php

return [
    'default_provider' => env('PAYMENT_DEFAULT_PROVIDER', 'stripe'),

'webhooks' => [
    'skip_verification' => env('PAYMENT_WEBHOOK_SKIP_VERIFY', false),
    'max_skew'          => env('PAYMENT_WEBHOOK_MAX_SKEW', 300),
],

    'providers' => [
        'stripe' => ['webhook_secret' => env('STRIPE_WEBHOOK_SECRET', '')],
        'tap'    => ['webhook_secret' => env('TAP_WEBHOOK_SECRET', '')],
        'hyperpay' => ['webhook_secret' => env('HYPERPAY_WEBHOOK_SECRET', '')],
    ],
     'netcommerce' => [
        'webhook_secret' => env('NETCOMMERCE_WEBHOOK_SECRET', ''),
    ],
    'cod' => [
        'webhook_secret' => '', // none needed; placeholder
    ],
];

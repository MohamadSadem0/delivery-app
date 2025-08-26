<?php
return [
  'providers' => [
    'stripe' => [
      'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
    ],
    'paypal' => [
      'webhook_secret' => env('PAYPAL_WEBHOOK_SECRET'),
    ],
  ],
];

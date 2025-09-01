<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'broadcasting/auth'],
    'allowed_methods' => ['*'],
    // DEV: keep '*' or list RN/web origins
    'allowed_origins' => ['*'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    // mobile app = stateless; keep false
    'supports_credentials' => false,
];
// return [
//     'paths' => ['api/*'],
//     'allowed_methods' => ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
//     // set your real origins via env to avoid commits with *
//     'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'https://app.example.com')),
//     'allowed_origins_patterns' => [],
//     'allowed_headers' => ['Content-Type','Authorization','X-Idempotency-Key','X-Signature','X-Timestamp'],
//     'exposed_headers' => [],
//     'max_age' => 3600,
//     'supports_credentials' => false,
// ];

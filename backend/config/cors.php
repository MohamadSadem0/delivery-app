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

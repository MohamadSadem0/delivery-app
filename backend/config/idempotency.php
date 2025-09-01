<?php

return [
    // Disable the middleware behavior without touching routes (handy for debugging)
    'disabled' => env('IDEMPOTENCY_DISABLED', false),

    // Cache store to use; falls back to config('cache.default') if empty
    'cache' => env('IDEMPOTENCY_CACHE', ''),

    // Response retention (seconds)
    'ttl' => env('IDEMPOTENCY_TTL', 86400), // 24h

    // Lock settings (seconds)
    'lock_ttl'  => env('IDEMPOTENCY_LOCK_TTL', 30),
    'lock_wait' => env('IDEMPOTENCY_LOCK_WAIT', 10),

    // Which HTTP statuses to cache/replay
    'cache_statuses' => [
        200, 201, 202, 204, 400, 401, 403, 404, 409, 422,
    ],
];

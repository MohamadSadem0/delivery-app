<?php

return [

    // Disable entirely (e.g., local testing)
    'disabled' => (bool) env('IDEMPOTENCY_DISABLED', false),

    // Cache store (null = default). Set to 'redis' if you use Redis.
    'cache' => env('IDEMPOTENCY_CACHE', null),

    // Store results for this many seconds (default: 24h)
    'ttl' => (int) env('IDEMPOTENCY_TTL', 24 * 60 * 60),

    // Lock duration and wait time (seconds)
    'lock_ttl'  => (int) env('IDEMPOTENCY_LOCK_TTL', 30),
    'lock_wait' => (int) env('IDEMPOTENCY_LOCK_WAIT', 10),

    // Which HTTP statuses to cache/replay
    'cache_statuses' => [200,201,202,204,400,401,403,404,409,422],
];

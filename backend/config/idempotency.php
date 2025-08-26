<?php

return [
    // TTL in seconds to cache responses for idempotent requests
    'ttl' => env('IDEMPOTENCY_TTL', 120),
];

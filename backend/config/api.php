<?php

return [
    'version' => 'v1',
    'rate_limit' => [
        'max' => env('API_RATE_LIMIT_MAX', 120),
        'decay' => env('API_RATE_LIMIT_DECAY', 60), // seconds
    ],
];

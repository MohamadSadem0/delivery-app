<?php

return [
    'engine' => env('PRODUCT_SEARCH_ENGINE', 'eloquent'), // eloquent|fulltext
    'cache_ttl' => env('PRODUCT_SEARCH_CACHE_TTL', 60),
];

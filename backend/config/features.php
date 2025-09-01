<?php

return [
    // Example flags you can use in routes: ->middleware('feature:payments_cod')
    'payments_cod' => env('FEATURE_PAYMENTS_COD', false),
    'dual_pricing' => env('FEATURE_DUAL_PRICING', false),
];

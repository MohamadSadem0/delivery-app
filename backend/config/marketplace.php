<?php

return [
    // Default commission %, can be overridden per store with a column if you have it (e.g., stores.commission_percent)
    'commission_percent' => (float) env('MARKETPLACE_COMMISSION_PERCENT', 10.0),
];

<?php

return [
    'enabled' => env('MONITORING_ENABLED', false),
    'exporter' => env('MONITORING_EXPORTER','prometheus'), // prometheus|none
];

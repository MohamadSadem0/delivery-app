<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\Vendor\ProductController as VendorProductController;

Route::prefix('v1/vendor')
    ->middleware(['auth:api', 'ensure.vendor'])
    ->group(function () {
        Route::get('products', [VendorProductController::class, 'index']);
        Route::post('products', [VendorProductController::class, 'store']);
        Route::get('products/{product}', [VendorProductController::class, 'show']);
        Route::patch('products/{product}', [VendorProductController::class, 'update']);
        Route::delete('products/{product}', [VendorProductController::class, 'destroy']);
    });

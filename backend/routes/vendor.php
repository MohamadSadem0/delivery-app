<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\Vendor\ProductController as VendorProductController;
use App\Http\Controllers\API\V1\Vendor\PayoutController;
// ✅ use the real class you created
use App\Http\Controllers\API\V1\Vendor\VendorStatementController;
use App\Http\Controllers\API\V1\Vendor\BalanceController;


Route::prefix('v1/vendor')
    ->middleware(['auth:api', 'ensure.vendor'])
    ->group(function () {
        // Products
        Route::get('products', [VendorProductController::class, 'index']);
        Route::post('products', [VendorProductController::class, 'store']);
        Route::get('products/{product}', [VendorProductController::class, 'show']);
        Route::patch('products/{product}', [VendorProductController::class, 'update']);
        Route::delete('products/{product}', [VendorProductController::class, 'destroy']);

        // Payouts
        Route::get('payouts', [PayoutController::class, 'index']);
        Route::get('payouts/{payout}', [PayoutController::class, 'show']);
        Route::post('payouts', [PayoutController::class, 'request']);

        // Statements
        Route::get('payouts/{payout}/statement', [VendorStatementController::class, 'download']);
          Route::get('balance', [BalanceController::class, 'show']);
        Route::get('ledger',  [BalanceController::class, 'ledger']);
    });

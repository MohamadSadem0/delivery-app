<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\Admin\UserController;
use App\Http\Controllers\API\V1\Admin\StoreAdminController;
use App\Http\Controllers\API\V1\Admin\OrderStatusController;
use App\Http\Controllers\API\V1\Admin\PayoutAdminController;
use App\Http\Controllers\API\V1\Admin\FeatureFlagController;
use App\Http\Controllers\API\V1\Admin\ActivityController;
use App\Http\Controllers\API\V1\Admin\JobFailureController;
use App\Http\Controllers\API\V1\Admin\RefundAdminController;


Route::prefix('v1/admin')
    ->middleware(['auth:api','ensure.admin'])
    ->group(function () {
        // Users
        Route::get('users', [UserController::class,'index']);
        Route::get('users/{user}', [UserController::class,'show']);
        Route::patch('users/{user}', [UserController::class,'update']);

        // Orders: state machine transition
        Route::patch('orders/{order}/status', [OrderStatusController::class, 'update']);

        // Payouts
        Route::get('payouts', [PayoutAdminController::class, 'index']);
        Route::post('payouts/{payout}/paid', [PayoutAdminController::class, 'markPaid']);

        // Stores
        Route::get('stores', [StoreAdminController::class,'index']);
        Route::patch('stores/{store}/toggle', [StoreAdminController::class,'toggle']);

        // Feature flags
        Route::get('feature-flags', [FeatureFlagController::class,'index']);
        Route::post('feature-flags', [FeatureFlagController::class,'upsert']);
        Route::delete('feature-flags/{flag}', [FeatureFlagController::class,'destroy']);

        // Ops
        Route::get('activities', [ActivityController::class,'index']);
        Route::get('jobs/failed', [JobFailureController::class,'index']);

         Route::get('refunds', [RefundAdminController::class, 'index']);
        Route::post('refunds/{refund}/approve', [RefundAdminController::class, 'approve']);
        Route::post('refunds/{refund}/decline', [RefundAdminController::class, 'decline']);
        Route::post('refunds/{refund}/process', [RefundAdminController::class, 'process']);

         Route::get('sections', [\App\Http\Controllers\API\V1\Admin\SectionAdminController::class, 'index']);
        Route::post('sections', [\App\Http\Controllers\API\V1\Admin\SectionAdminController::class, 'store']);
        Route::get('sections/{section}', [\App\Http\Controllers\API\V1\Admin\SectionAdminController::class, 'show']);
        Route::patch('sections/{section}', [\App\Http\Controllers\API\V1\Admin\SectionAdminController::class, 'update']);
        Route::delete('sections/{section}', [\App\Http\Controllers\API\V1\Admin\SectionAdminController::class, 'destroy']);

        // Categories
        Route::get('categories', [\App\Http\Controllers\API\V1\Admin\CategoryAdminController::class, 'index']);
        Route::post('categories', [\App\Http\Controllers\API\V1\Admin\CategoryAdminController::class, 'store']);
        Route::get('categories/{category}', [\App\Http\Controllers\API\V1\Admin\CategoryAdminController::class, 'show']);
        Route::patch('categories/{category}', [\App\Http\Controllers\API\V1\Admin\CategoryAdminController::class, 'update']);
        Route::delete('categories/{category}', [\App\Http\Controllers\API\V1\Admin\CategoryAdminController::class, 'destroy']);
  
    });

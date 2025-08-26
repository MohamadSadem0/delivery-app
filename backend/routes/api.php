<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\CatalogController;
use App\Http\Controllers\API\V1\SearchController;
use App\Http\Controllers\API\V1\PaymentController;
use App\Http\Controllers\API\V1\CouponController;
use App\Http\Controllers\API\V1\OrderController;
use App\Http\Controllers\API\V1\CartController;

// /api prefix is registered by RouteServiceProvider
Route::prefix('v1')->group(function () {
    // Auth (public)
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/login', [AuthController::class, 'login']);

    // Catalog (public)
    Route::get('catalog/categories', [CatalogController::class, 'categories']);
    Route::get('catalog/products', [CatalogController::class, 'products']);
    Route::get('catalog/products/{product}', [CatalogController::class, 'show']);

    // Search (public) — FIXED path (was mistakenly v1/search inside v1 prefix)
    Route::get('search/products', [SearchController::class, 'products']);

    // Payments — webhook is public but SIGNED
    Route::post('payments/webhook', [PaymentController::class, 'webhook'])
        ->middleware('verify.payment.webhook');

    // Authenticated
    Route::middleware(['auth:api'])->group(function () {
        // Auth
        Route::get('auth/me', [AuthController::class, 'me']);
        Route::post('auth/refresh', [AuthController::class, 'refresh']);
        Route::post('auth/logout', [AuthController::class, 'logout']);
        Route::patch('auth/profile', [AuthController::class, 'updateProfile']);
        Route::patch('auth/password', [AuthController::class, 'changePassword']);

        // Cart
        Route::get('cart', [CartController::class, 'show']);
        Route::post('cart/items', [CartController::class, 'addItem'])->middleware('idempotency');
        Route::patch('cart/items/{item}', [CartController::class, 'updateItem']);
        Route::delete('cart/items/{item}', [CartController::class, 'removeItem']);

        // Checkout → creates Order (idempotent)
        Route::post('checkout', [OrderController::class, 'checkout'])->middleware('idempotency');

        // Payments → create intent (idempotent)
        Route::post('payments/intent', [PaymentController::class, 'createIntent'])->middleware('idempotency');

        // Coupon preview
        Route::get('coupons/preview', [CouponController::class, 'preview']);
    });
});

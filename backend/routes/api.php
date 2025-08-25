<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\DeliveryController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PromotionController;

use App\Http\Controllers\Api\Vendor\StoreAdminController;
use App\Http\Controllers\Api\Vendor\ProductAdminController;
use App\Http\Controllers\Api\Vendor\OrderAdminController;

// Health
Route::get('/health', [HealthController::class, 'ping']);

// Auth
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login',    [AuthController::class, 'login']);
    Route::middleware('auth:api')->group(function () {
        Route::get('me',       [AuthController::class, 'me']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('logout',  [AuthController::class, 'logout']);
    });
});

// Public catalog
Route::get('/stores',               [StoreController::class, 'index']);
Route::get('/stores/{id}',          [StoreController::class, 'show']);
Route::get('/stores/{id}/sections', [StoreController::class, 'sections']);
Route::get('/stores/{id}/products', [StoreController::class, 'products']);
Route::get('/products',             [ProductController::class, 'index']);
Route::get('/products/{id}',        [ProductController::class, 'show']);

// Authenticated
Route::middleware('auth:api')->group(function () {
    // User
    Route::get('/me', [UserController::class, 'profile']);
    Route::get('/me/addresses', [UserController::class, 'addresses']);
    Route::post('/me/addresses', [UserController::class, 'addAddress']);

    // Cart
    Route::get('/cart', [CartController::class, 'show']);
    Route::post('/cart/items', [CartController::class, 'addItem']);
    Route::put('/cart/items/{itemId}', [CartController::class, 'updateItem']);
    Route::delete('/cart/items/{itemId}', [CartController::class, 'removeItem']);

    // Checkout & Orders (customer)
    Route::post('/orders/checkout', [CheckoutController::class, 'checkout']);
    Route::get('/orders', [OrderController::class, 'list']);
    Route::get('/orders/{orderId}', [OrderController::class, 'show']);
    Route::post('/orders/{orderId}/cancel', [OrderController::class, 'cancel']);

    // Payments
    Route::post('/payments/intent', [PaymentController::class, 'createIntent']);

    // Promotions
    Route::post('/promotions/apply', [PromotionController::class, 'apply']);

    // Reviews
    Route::post('/reviews', [ReviewController::class, 'storeReview']);
    Route::post('/delivery-reviews', [ReviewController::class, 'deliveryReview']);

    // Delivery role flow
    Route::get('/deliveries/open', [DeliveryController::class, 'openDeliveries'])->middleware('role:DELIVERY,ADMIN');
    Route::post('/deliveries/{deliveryId}/offers', [DeliveryController::class, 'offer'])->middleware('role:DELIVERY,ADMIN');
    Route::post('/deliveries/{deliveryId}/offers/{offerId}/accept', [DeliveryController::class, 'acceptOffer']); // customer/store
    Route::post('/deliveries/{deliveryId}/status', [DeliveryController::class, 'updateStatus'])->middleware('role:DELIVERY,ADMIN');

    // Vendor admin
    Route::prefix('vendor')->middleware('role:VENDOR,ADMIN')->group(function () {
        Route::get('stores', [StoreAdminController::class, 'myStores']);
        Route::post('stores', [StoreAdminController::class, 'create']);
        Route::put('stores/{storeId}', [StoreAdminController::class, 'update']);
        Route::get('stores/{storeId}/sections', [StoreAdminController::class, 'sections']);
        Route::post('stores/{storeId}/sections', [StoreAdminController::class, 'upsertSection']);

        Route::post('stores/{storeId}/products', [ProductAdminController::class, 'upsert']);
        Route::get('stores/{storeId}/products/{productId}/variants', [ProductAdminController::class, 'variants']);
        Route::post('stores/{storeId}/products/{productId}/variants', [ProductAdminController::class, 'upsertVariant']);

        Route::get('stores/{storeId}/orders', [OrderAdminController::class, 'list']);
        Route::post('stores/{storeId}/orders/{orderStoreId}/status', [OrderAdminController::class, 'updateStatus']);
    });
});

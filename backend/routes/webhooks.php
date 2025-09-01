<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\Webhooks\PaymentWebhookController;


Route::prefix('v1/webhooks/payments')
    ->middleware(['request.id', 'verify.payment.webhook', 'verify.and.log.webhook'])
    ->group(function () {
        Route::post('{provider}', [PaymentWebhookController::class, 'handle']);
    });
Route::post('v1/webhooks/payments/{provider}', [PaymentWebhookController::class, 'handle'])
    ->middleware(['request.id', 'verify.payment.webhook', 'verify.and.log.webhook']);

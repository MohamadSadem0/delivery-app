<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\SetLocale::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];

    protected $middlewareGroups = [
        'api' => [
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            // If you prefer enforcing idempotency globally for API mutations, uncomment:
            // \App\Http\Middleware\Idempotency::class,
        ],
    ];

    protected $routeMiddleware = [
        'auth'                   => \Illuminate\Auth\Middleware\Authenticate::class,
        'bindings'               => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'throttle'               => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'ensure.vendor'          => \App\Http\Middleware\EnsureVendor::class,
        'ensure.admin'           => \App\Http\Middleware\EnsureAdmin::class,
        'idempotency'            => \App\Http\Middleware\Idempotency::class,
        'verify.payment.webhook' => \App\Http\Middleware\VerifyPaymentWebhookSignature::class,
        'verify.and.log.webhook' => \App\Http\Middleware\VerifyAndLogPaymentWebhook::class,
        'request.id' => \App\Http\Middleware\RequestId::class,
    ];
}

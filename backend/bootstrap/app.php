<?php

// use Illuminate\Foundation\Application;
// use Illuminate\Foundation\Configuration\Exceptions;
// use Illuminate\Foundation\Configuration\Middleware;
// use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

// return Application::configure(basePath: dirname(__DIR__))
//     ->withRouting(
//         web: __DIR__.'/../routes/web.php',
//         api: __DIR__.'/../routes/api.php',
//         commands: __DIR__.'/../routes/console.php',
//         health: '/up',
//     )
//     ->withMiddleware(function (Middleware $middleware): void {
//         // Global middleware (Laravel already registers CORS if installed)
//         // $middleware->append(\Illuminate\Http\Middleware\HandleCors::class);

//         // Middleware aliases you can use in routes:
//         $middleware->alias([
//             // Role-based access control for API routes (from scaffold)
//             'role' => \App\Http\Middleware\RoleMiddleware::class,
//         ]);

//         // If you need to customize middleware groups:
//         // $middleware->group('api', [
//         //     \Illuminate\Routing\Middleware\SubstituteBindings::class,
//         //     \Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
//         //     \Illuminate\Http\Middleware\HandleCors::class,
//         // ]);
//     })
//     ->withExceptions(function (Exceptions $exceptions): void {
//         // Return JSON for API requests with correct HTTP status codes
//         $exceptions->render(function (\Throwable $e, $request) {
//             if ($request->expectsJson() || $request->is('api/*')) {
//                 $status = 500;
//                 $headers = [];

//                 if ($e instanceof HttpExceptionInterface) {
//                     $status = $e->getStatusCode();
//                     $headers = $e->getHeaders();
//                 }

//                 return response()->json([
//                     'message' => $e->getMessage() ?: 'Server Error',
//                 ], $status, $headers);
//             }

//             // Let Laravel handle non-API requests normally
//             return null;
//         });
//     })
//     ->create();



use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        // 👇 Pass an array of API route files (no Closures)
        api: [
            __DIR__ . '/../routes/api.php',
            __DIR__ . '/../routes/vendor.php',
            __DIR__ . '/../routes/admin.php',
        ],
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Middleware aliases you can use in routes:
        $middleware->alias([
            'role'                   => \App\Http\Middleware\RoleMiddleware::class,
            'verify.payment.webhook' => \App\Http\Middleware\VerifyPaymentWebhookSignature::class,
            'idempotency'            => \App\Http\Middleware\Idempotency::class,
            'ensure.vendor'          => \App\Http\Middleware\EnsureVendor::class,
            'ensure.admin'           => \App\Http\Middleware\EnsureAdmin::class,
             
        ]);

        // If you need to customize middleware groups:
        // $middleware->group('api', [
        //     \Illuminate\Routing\Middleware\SubstituteBindings::class,
        //     \Illuminate\Routing\Middleware\ThrottleRequests::class . ':api',
        //     \Illuminate\Http\Middleware\HandleCors::class,
        // ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Return JSON for API requests with correct HTTP status codes
        $exceptions->render(function (\Throwable $e, $request) {
            if ($request->expectsJson() || $request->is('api/*')) {
                $status = 500;
                $headers = [];

                if ($e instanceof HttpExceptionInterface) {
                    $status = $e->getStatusCode();
                    $headers = $e->getHeaders();
                }

                return response()->json([
                    'message' => $e->getMessage() ?: 'Server Error',
                ], $status, $headers);
            }

            return null; // Let Laravel handle non-API requests normally
        });
    })
    ->create();

    

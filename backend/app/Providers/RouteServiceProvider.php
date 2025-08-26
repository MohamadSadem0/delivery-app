<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        parent::boot();

        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        // Separate vendor API group
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/vendor.php'));
    }
}



// use Illuminate\Cache\RateLimiting\Limit;
// use Illuminate\Support\Facades\RateLimiter;
// use Illuminate\Http\Request;

// public function boot(): void
// {
//     RateLimiter::for('login', fn(Request $request) =>
//         Limit::perMinute(5)->by($request->ip())
//     );

//     RateLimiter::for('checkout', fn(Request $request) =>
//         Limit::perMinute(10)->by(optional($request->user())->id ?: $request->ip())
//     );

//     RateLimiter::for('webhook', fn(Request $request) =>
//         Limit::perMinute(60)->by($request->ip())
//     );
// }
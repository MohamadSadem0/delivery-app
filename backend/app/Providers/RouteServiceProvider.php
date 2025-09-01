<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        parent::boot();

        // Core public/customer API
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        // Vendor API
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/vendor.php'));

        // Admin API (was not being registered)
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/admin.php'));
                Route::model('address', \App\Domain\Addressing\Models\UserAddress::class);

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
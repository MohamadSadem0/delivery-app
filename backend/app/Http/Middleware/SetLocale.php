<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        // Example: get locale from header, query, or fallback to config
        $locale = $request->header('X-Locale', $request->get('lang', config('app.locale')));

        if (in_array($locale, config('app.supported_locales', ['en']))) {
            App::setLocale($locale);
        }

        return $next($request);
    }
}

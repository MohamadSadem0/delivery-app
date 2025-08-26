<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CurrencySelector
{
    public function handle(Request $request, Closure $next)
    {
        $currency = strtoupper($request->header('X-Currency', config('currency.base','LBP')));
        app()->instance('selectedCurrency', $currency);
        return $next($request);
    }
}

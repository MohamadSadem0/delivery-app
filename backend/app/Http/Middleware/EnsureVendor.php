<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureVendor
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth('api')->user();
        if (!$user || $user->role !== 'vendor') {
            return response()->json(['message' => 'Vendor access only'], 403);
        }
        return $next($request);
    }
}

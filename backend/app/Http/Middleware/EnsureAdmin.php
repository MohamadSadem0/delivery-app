<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth('api')->user();
        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Admin access only'], 403);
        }
        return $next($request);
    }
}

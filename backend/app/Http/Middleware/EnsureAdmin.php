<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth('api')->user() ?? $request->user('api');

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // normalize to lowercase so ADMIN/Admin/admin all pass
        $role = strtolower((string) ($user->role ?? ''));

        if ($role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}

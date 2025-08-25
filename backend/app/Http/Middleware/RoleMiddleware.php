<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Usage: ->middleware('role:ADMIN') or multiple ->middleware('role:VENDOR,ADMIN')
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = auth('api')->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        if (empty($roles)) {
            return $next($request);
        }

        if (!in_array($user->role, $roles, true)) {
            return response()->json(['message' => 'Forbidden: role'], 403);
        }

        return $next($request);
    }
}

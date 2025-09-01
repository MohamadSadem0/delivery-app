<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureVendor
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user('api');
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // basic role check
        if (strtolower((string) $user->role) === 'vendor') {
            return $next($request);
        }

        // fallback: if role is not explicit, allow if the user owns at least one store
        $ownsAStore = \App\Domain\Store\Models\Store::query()
            ->where('user_id', $user->getAuthIdentifier())
            ->exists();

        if ($ownsAStore) {
            return $next($request);
        }

        return response()->json(['message' => 'Forbidden'], 403);
    }
}

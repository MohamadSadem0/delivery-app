<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IpDenylist
{
    public function handle(Request $request, Closure $next)
    {
        $deny = array_filter(array_map('trim', config('security.ip_denylist', [])));
        if (!empty($deny) && in_array($request->ip(), $deny, true)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return $next($request);
    }
}

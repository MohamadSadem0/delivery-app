<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\IpUtils;

class IpDenylist
{
    public function handle(Request $request, Closure $next)
    {
        $denied = config('security.denylist', []);
        $ip = $request->ip();

        if (!empty($denied) && IpUtils::checkIp($ip, $denied)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}

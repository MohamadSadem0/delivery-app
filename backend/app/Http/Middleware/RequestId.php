<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RequestId
{
    public function handle(Request $request, Closure $next)
    {
        $id = $request->headers->get('X-Request-Id') ?? (string) Str::uuid();
        $request->headers->set('X-Request-Id', $id);
        $response = $next($request);
        return $response->header('X-Request-Id', $id);
    }
}

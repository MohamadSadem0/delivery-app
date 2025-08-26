<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class RequestId
{
    public function handle(Request $request, Closure $next)
    {
        $rid = $request->headers->get('X-Request-Id') ?: (string) Str::uuid();
        // attach to request and logs
        $request->attributes->set('request_id', $rid);
        Log::withContext(['request_id' => $rid]);

        $response = $next($request);
        $response->headers->set('X-Request-Id', $rid);
        return $response;
    }
}

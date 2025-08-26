<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class Idempotency
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->isMethodSafe() && $request->is('api/*')) {
            $key = $request->header('Idempotency-Key');

            if (!$key) {
                return response()->json(['message' => 'Missing Idempotency-Key header'], 409);
            }

            $cacheKey = 'idemp:' . sha1($request->method().'|'.$request->path().'|'.$key);

            // If we have a cached response, return it
            if (Cache::has($cacheKey)) {
                $cached = Cache::get($cacheKey);
                return new Response($cached['content'], $cached['status'], $cached['headers']);
            }

            // Process request and store response for a TTL
            /** @var \Symfony\Component\HttpFoundation\Response $response */
            $response = $next($request);

            $ttl = (int) config('idempotency.ttl', 120);
            Cache::put($cacheKey, [
                'status' => $response->getStatusCode(),
                'headers' => $response->headers->allPreserveCaseWithoutCookies(),
                'content' => $response->getContent(),
            ], $ttl);

            return $response;
        }

        return $next($request);
    }
}

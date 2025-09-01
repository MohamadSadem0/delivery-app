<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PrometheusMetrics
{
    public function handle(Request $request, Closure $next)
    {
        /** @var \Symfony\Component\HttpFoundation\Response $response */
        $response = $next($request);

        // Increment counters (pseudo, integrate with prometheus client lib)
        // app('prometheus')->inc('http_requests_total', ['method'=>$request->method(),'path'=>$request->path(),'status'=>$response->getStatusCode()]);

        return $response;
    }
}

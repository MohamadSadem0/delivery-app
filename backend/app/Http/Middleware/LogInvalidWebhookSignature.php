<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Domain\Security\Services\SuspiciousActivityService;

class LogInvalidWebhookSignature
{
    public function __construct(protected SuspiciousActivityService $service) {}

    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if ($response->getStatusCode() === 401 && str_contains($response->getContent(), 'Invalid webhook signature')) {
            $this->service->log(null, 'webhook_invalid_signature', [
                'path' => $request->path(),
                'payload' => substr($request->getContent(), 0, 500),
            ]);
        }

        return $response;
    }
}

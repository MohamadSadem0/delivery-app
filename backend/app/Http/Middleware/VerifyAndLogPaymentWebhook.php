<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Domain\Security\Services\SuspiciousActivityService;

class VerifyAndLogPaymentWebhook
{
    public function __construct(protected SuspiciousActivityService $suspicious) {}

    public function handle(Request $request, Closure $next)
    {
        if (app()->environment('local', 'testing')) {
            return $next($request);
        }

        $secret = config('services.webhooks.payment_secret', env('PAYMENT_WEBHOOK_SECRET'));
        $signature = $request->header('X-Signature');
        $payload = $request->getContent();
        $expected = hash_hmac('sha256', $payload, (string)$secret);

        if (!$secret || !hash_equals($expected, (string)$signature)) {
            $this->suspicious->log(null, 'webhook_invalid_signature', [
                'path' => $request->path(),
                'provider' => $request->input('provider'),
                'sig' => $signature,
            ]);
            return response()->json(['message' => 'Invalid webhook signature'], 401);
        }

        return $next($request);
    }
}

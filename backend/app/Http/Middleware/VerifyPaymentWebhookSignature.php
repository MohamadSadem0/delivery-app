<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyPaymentWebhookSignature
{
    public function handle(Request $request, Closure $next)
    {
        if (app()->environment('local', 'testing')) {
            return $next($request);
        }

        $secret = config('services.webhooks.payment_secret', env('PAYMENT_WEBHOOK_SECRET'));
        if (!$secret) {
            return response()->json(['message' => 'Webhook secret not configured'], 500);
        }

        $signature = $request->header('X-Signature');
        $payload = $request->getContent();

        $expected = hash_hmac('sha256', $payload, $secret);

        if (!hash_equals($expected, (string)$signature)) {
            // optionally log suspicious activity
            return response()->json(['message' => 'Invalid webhook signature'], 401);
        }

        return $next($request);
    }
}

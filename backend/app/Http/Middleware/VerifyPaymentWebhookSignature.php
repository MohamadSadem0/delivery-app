<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyPaymentWebhookSignature
{
    public function handle(Request $request, Closure $next)
    {
        // if (app()->environment('local', 'testing')) {
        //     return $next($request);
        // }

        // $secret = config('services.webhooks.payment_secret', env('PAYMENT_WEBHOOK_SECRET'));
        // if (!$secret) {
        //     return response()->json(['message' => 'Webhook secret not configured'], 500);
        // }

        // $signature = $request->header('X-Signature');
        // $payload = $request->getContent();

        // $expected = hash_hmac('sha256', $payload, $secret);

        // if (!hash_equals($expected, (string)$signature)) {
        //     // optionally log suspicious activity
        //     return response()->json(['message' => 'Invalid webhook signature'], 401);
        // }

        // return $next($request);

        $signature = $request->header('X-Signature');
$timestamp = (int) $request->header('X-Timestamp'); // seconds epoch
$skew      = 300; // 5 minutes

if (!$timestamp || abs(time() - $timestamp) > $skew) {
    abort(400, 'Stale webhook');
}

$provider = $request->route('provider'); // 'stripe', 'paypal', etc
$secret   = config("payments.providers.$provider.webhook_secret");

if (!$secret) abort(400, 'Unknown provider');

$payload  = $timestamp.'.'.$request->getContent();
$expected = hash_hmac('sha256', $payload, $secret);

if (!hash_equals($expected, $signature)) {
    abort(401, 'Invalid signature');
}
return $next($request);
    }
}

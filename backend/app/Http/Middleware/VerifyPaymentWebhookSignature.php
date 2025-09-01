<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VerifyPaymentWebhookSignature
{
    public function handle(Request $request, Closure $next)
    {
        // Preserve legacy behavior: allow explicit bypass if configured
        if (config('payments.webhooks.skip_verification')) {
            return $next($request);
        }

        $raw = $request->getContent();
        $payload = json_decode($raw, true) ?? [];

        // Provider priority: header → route param → JSON body
        $provider = strtolower((string) (
            $request->header('X-Payment-Provider')
            ?? $request->route('provider')
            ?? ($payload['provider'] ?? '')
        ));

        if ($provider === '') {
            Log::warning('Webhook verification failed: missing provider', ['headers' => $request->headers->all()]);
            abort(400, 'Missing payment provider');
        }

        $ok = match ($provider) {
            'stripe'   => $this->verifyStripe($request, $raw),
            'tap'      => $this->verifyGenericHmac($request, $raw, 'tap'),
            'hyperpay' => $this->verifyGenericHmac($request, $raw, 'hyperpay'),
            default    => false,
        };

        if (!$ok) {
            Log::warning('Webhook verification failed', [
                'provider' => $provider,
                'headers'  => $request->headers->all(),
                'ip'       => $request->ip(),
            ]);
            abort(401, 'Invalid webhook signature');
        }

        return $next($request);
    }

    private function verifyStripe(Request $request, string $raw): bool
    {
        $sigHeader = $request->header('Stripe-Signature');
        $secret    = (string) config('payments.providers.stripe.webhook_secret');

        if (!$sigHeader || $secret === '') {
            return false;
        }

        // Stripe format: "t=timestamp,v1=hex[,v0=hex...]"
        $parts = [];
        foreach (explode(',', $sigHeader) as $pair) {
            $bits = explode('=', trim($pair), 2);
            if (count($bits) === 2) {
                $parts[$bits[0]] = $bits[1];
            }
        }

        $t  = $parts['t']  ?? null;
        $v1 = $parts['v1'] ?? null;
        if (!$t || !$v1) return false;

        $signedPayload = $t . '.' . $raw;
        $computed = hash_hmac('sha256', $signedPayload, $secret);

        // Optional replay protection (defaults to 5 minutes)
        $maxSkew = (int) config('payments.webhooks.max_skew', 300);
        if ($maxSkew > 0 && abs(time() - (int) $t) > $maxSkew) return false;

        return hash_equals($v1, $computed);
    }

    private function verifyGenericHmac(Request $request, string $raw, string $provider): bool
    {
        // Accept provider-specific header or generic X-Signature (also uppercase variant)
        $sig = $request->header('X-Signature')
            ?? $request->header(ucfirst($provider) . '-Signature')
            ?? $request->header(strtoupper($provider) . '-Signature');

        $secret = (string) config("payments.providers.$provider.webhook_secret");
        if (!$sig || $secret === '') return false;

        $computed = hash_hmac('sha256', $raw, $secret);
        return hash_equals($sig, $computed);
    }
}

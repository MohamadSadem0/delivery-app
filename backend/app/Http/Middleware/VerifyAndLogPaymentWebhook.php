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
        // Keep your original bypass
        if (app()->environment('local', 'testing')) {
            return $next($request);
        }

        $payload  = $request->getContent();

        // Provider priority: header → route → JSON body (unchanged, just more robust)
        $provider = $request->header('X-Payment-Provider')
            ?? $request->route('provider')
            ?? $request->input('provider');

        // Secrets: prefer provider-specific, else your global fallback (unchanged behavior)
        $providerSecret = $provider ? (string) config("payments.providers.$provider.webhook_secret", '') : '';
        $globalSecret   = (string) config('services.webhooks.payment_secret', env('PAYMENT_WEBHOOK_SECRET', ''));
        $secret         = $providerSecret !== '' ? $providerSecret : $globalSecret;

        // If nothing to verify against, treat as invalid (keeps your strictness)
        if ($secret === '') {
            $this->suspicious->log(null, 'webhook_invalid_signature', [
                'path'     => $request->path(),
                'provider' => $provider,
                'reason'   => 'missing_secret',
            ]);
            return response()->json(['message' => 'Invalid webhook signature'], 401);
        }

        // Detect Stripe header
        $stripeSig = $request->header('Stripe-Signature');
        if ($stripeSig && ($provider === 'stripe' || !$provider)) {
            if (!$this->verifyStripe($stripeSig, $payload, $secret)) {
                $this->suspicious->log(null, 'webhook_invalid_signature', [
                    'path'     => $request->path(),
                    'provider' => $provider ?: 'stripe',
                    'reason'   => 'stripe_mismatch',
                ]);
                return response()->json(['message' => 'Invalid webhook signature'], 401);
            }

            // success
            return $next($request);
        }

        // Generic HMAC (Tap/Hyperpay/etc.)
        $signature = $request->header('X-Signature')
            ?? ($provider ? $request->header(ucfirst((string) $provider) . '-Signature') : null)
            ?? ($provider ? $request->header(strtoupper((string) $provider) . '-Signature') : null);

        if (!$signature) {
            $this->suspicious->log(null, 'webhook_invalid_signature', [
                'path'     => $request->path(),
                'provider' => $provider,
                'reason'   => 'missing_signature_header',
            ]);
            return response()->json(['message' => 'Invalid webhook signature'], 401);
        }

        $expected = hash_hmac('sha256', $payload, $secret);
        if (!hash_equals($expected, (string) $signature)) {
            $this->suspicious->log(null, 'webhook_invalid_signature', [
                'path'     => $request->path(),
                'provider' => $provider,
                'reason'   => 'generic_hmac_mismatch',
            ]);
            return response()->json(['message' => 'Invalid webhook signature'], 401);
        }

        return $next($request);
    }

    private function verifyStripe(string $sigHeader, string $raw, string $secret): bool
    {
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

        $signed = $t . '.' . $raw;
        $computed = hash_hmac('sha256', $signed, $secret);

        // Replay window (defaults to 5 minutes if not configured)
        $maxSkew = (int) config('payments.webhooks.max_skew', 300);
        if ($maxSkew > 0 && abs(time() - (int) $t) > $maxSkew) return false;

        return hash_equals($v1, $computed);
    }
}

<?php

namespace App\Domain\Payment\Services;

use Illuminate\Support\Facades\Log;

class PaymentSignatureVerifier
{
    public function verify(array $payload, string $provider, ?string $signatureHeader): bool
    {
        // Preserve legacy behavior: if secret is missing, allow (but warn)
        $secret = (string) config("payments.providers.$provider.webhook_secret");
        if ($secret === '') {
            Log::warning('PaymentSignatureVerifier: missing webhook_secret for provider', ['provider' => $provider]);
            return true;
        }

        $raw = json_encode($payload, JSON_UNESCAPED_SLASHES);
        $expected = hash_hmac('sha256', $raw, $secret);
        return hash_equals($expected, (string) ($signatureHeader ?? ''));
    }
}

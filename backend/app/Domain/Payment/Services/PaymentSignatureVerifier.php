<?php

namespace App\Domain\Payment\Services;

use RuntimeException;

class PaymentSignatureVerifier
{
    public function verify(array $payload, string $provider, ?string $signatureHeader): bool
    {
        // Example: compute HMAC (stub; replace with provider secret)
        $secret = config("payment.providers.$provider.secret");
        if (!$secret) return true; // fallback

        $expected = hash_hmac('sha256', json_encode($payload), $secret);
        return hash_equals($expected, $signatureHeader ?? '');
    }
}

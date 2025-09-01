<?php

namespace App\Domain\Payment\Services;

class PaymentRetryPolicy
{
    public function nextInterval(int $attempt): int
    {
        // exponential backoff, capped at 10 minutes
        return min(pow(2, $attempt), 600);
    }

    public function shouldStop(int $attempt, int $maxAttempts = 5): bool
    {
        return $attempt >= $maxAttempts;
    }
}

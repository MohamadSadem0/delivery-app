<?php

namespace App\Domain\Payment\Services;

use App\Domain\Payment\Models\PaymentAttempt;
use Illuminate\Support\Facades\DB;

class PaymentRetryService
{
    public function beginAttempt(int $orderId, ?string $idempotencyKey = null): PaymentAttempt
    {
        $last = PaymentAttempt::where('order_id', $orderId)->latest('attempt_no')->first();
        $no = $last ? $last->attempt_no + 1 : 1;

        return PaymentAttempt::create([
            'order_id' => $orderId,
            'idempotency_key' => $idempotencyKey,
            'attempt_no' => $no,
            'status' => 'pending',
        ]);
    }

    public function completeAttempt(PaymentAttempt $attempt, string $status, array $meta = []): PaymentAttempt
    {
        $attempt->status = $status;
        $attempt->meta = $meta ?: null;
        $attempt->save();
        return $attempt;
    }

    public function attemptsCount(int $orderId): int
    {
        return PaymentAttempt::where('order_id', $orderId)->count();
    }

    public function exceededLimit(int $orderId, int $max = 3): bool
    {
        return $this->attemptsCount($orderId) >= $max;
    }
}

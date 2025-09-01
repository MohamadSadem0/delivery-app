<?php

namespace App\Domain\Payment\Services;

use App\Domain\Payment\Models\PaymentAttempt;
use Illuminate\Support\Facades\DB;

class PaymentRetryService
{
    /**
     * Returns true if attempts for the order in the last 24h exceed $limit.
     */
    public function exceededLimit(int $orderId, int $limit): bool
    {
        $count = PaymentAttempt::query()
            ->where('order_id', $orderId)
            ->where('created_at', '>=', now()->subDay())
            ->count();

        return $count >= $limit;
    }

    /**
     * Start a new attempt with the next attempt_no.
     */
    public function beginAttempt(int $orderId, ?string $idempotencyKey = null): PaymentAttempt
    {
        return DB::transaction(function () use ($orderId, $idempotencyKey) {
            $lastNo = (int) PaymentAttempt::query()
                ->where('order_id', $orderId)
                ->max('attempt_no');

            $attempt = PaymentAttempt::create([
                'order_id'        => $orderId,
                'attempt_no'      => $lastNo + 1,
                'idempotency_key' => $idempotencyKey ? trim($idempotencyKey) : null,
                'status'          => 'started',
                'meta'            => null,
            ]);

            return $attempt;
        });
    }

    /**
     * Complete an attempt with a final status and optional metadata.
     */
    public function completeAttempt(PaymentAttempt $attempt, string $status, array $meta = []): PaymentAttempt
    {
        $attempt->status = $status;
        $attempt->meta   = empty($meta) ? null : $meta;
        $attempt->save();

        return $attempt;
    }
}

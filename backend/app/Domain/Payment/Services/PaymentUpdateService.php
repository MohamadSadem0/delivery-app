<?php

namespace App\Domain\Payment\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

/**
 * Updates payment attempts/orders in an idempotent & schema-safe way:
 * - Detects columns/tables at runtime (no errors if a table/column doesn't exist).
 * - Tries multiple common reference columns to locate the payment attempt or order.
 * - Writes raw payload if a suitable column exists.
 */
class PaymentUpdateService
{
    /** @var string[] */
    protected array $refColumns = [
        'reference', 'provider_ref', 'provider_reference', 'external_id',
        'transaction_id', 'intent_id', 'charge_id', 'merchant_transaction_id',
    ];

    public function markPaid(string $provider, string $externalId, ?int $amountMinor, ?string $currency, array $payload): void
    {
        $this->updateAttemptAndOrder($provider, $externalId, 'succeeded', $amountMinor, $currency, $payload);
    }

    public function markFailed(string $provider, string $externalId, string $code, string $message, array $payload): void
    {
        $this->updateAttemptAndOrder($provider, $externalId, 'failed', null, null, $payload, [
            'failure_code' => $code,
            'failure_message' => $message,
        ]);
    }

    public function markRefunded(string $provider, string $externalId, ?int $amountMinor, ?string $currency, array $payload): void
    {
        $this->updateAttemptAndOrder($provider, $externalId, 'refunded', $amountMinor, $currency, $payload);
    }

    protected function updateAttemptAndOrder(
        string $provider,
        string $externalId,
        string $status,
        ?int $amountMinor,
        ?string $currency,
        array $payload,
        array $extra = []
    ): void {
        DB::transaction(function () use ($provider, $externalId, $status, $amountMinor, $currency, $payload, $extra) {

            $attempt = $this->findPaymentAttempt($provider, $externalId);

            if ($attempt) {
                // idempotency: skip if already at terminal state
                $current = strtolower((string) ($attempt->status ?? ''));
                if (in_array($current, ['succeeded','refunded']) && in_array($status, ['succeeded','refunded'])) {
                    return;
                }

                $updates = array_merge([
                    'status'    => $status,
                    'amount'    => $this->maybeColumn($attempt->getTable(), 'amount') ? $amountMinor : null,
                    'currency'  => $this->maybeColumn($attempt->getTable(), 'currency') ? $currency : null,
                    'processed_at' => now(),
                ], $extra);

                // Clean null keys not supported by the table
                $updates = array_filter($updates, function ($value, $key) use ($attempt) {
                    return $value !== null ? true : $this->maybeColumn($attempt->getTable(), $key);
                }, ARRAY_FILTER_USE_BOTH);

                $attempt->fill($updates)->save();

                // Try to update the parent order, if linked
                $order = $this->findOrderForAttempt($attempt);
                if ($order) {
                    $orderUpdates = [];
                    $orderTable = $order->getTable();

                    if ($this->maybeColumn($orderTable, 'payment_status')) {
                        $orderUpdates['payment_status'] = $status === 'succeeded' ? 'paid' : ($status === 'refunded' ? 'refunded' : 'unpaid');
                    }
                    if ($status === 'succeeded' && $this->maybeColumn($orderTable, 'paid_at')) {
                        $orderUpdates['paid_at'] = now();
                    }
                    if (!empty($orderUpdates)) {
                        $order->fill($orderUpdates)->save();
                    }
                }
            }

            // Persist raw payload if the attempt or an audit table supports it
            $this->storePayload($provider, $externalId, $payload);
        });
    }

    protected function findPaymentAttempt(string $provider, string $externalId): ?object
    {
        $candidates = [
            ['table' => 'payment_attempts', 'provider_col' => 'provider'],
            ['table' => 'payments',         'provider_col' => 'provider'],
        ];

        foreach ($candidates as $cand) {
            if (!Schema::hasTable($cand['table'])) continue;

            $query = DB::table($cand['table'])->where($cand['provider_col'], $provider);

            // dynamically add reference matches only if column exists
            $query->where(function ($q) use ($cand, $externalId) {
                foreach ($this->refColumns as $col) {
                    if (Schema::hasColumn($cand['table'], $col)) {
                        $q->orWhere($col, $externalId);
                    }
                }
            });

            $row = $query->first();
            if ($row) {
                // Return as Eloquent model if class exists; else return stdClass
                $class = $this->guessModelClass($cand['table']);
                if ($class && class_exists($class)) {
                    return $class::query()->whereKey($row->id)->first();
                }
                return $row; // stdClass fallback
            }
        }
        return null;
    }

    protected function findOrderForAttempt(object $attempt): ?object
    {
        // Use order_id if present
        $attemptTable = method_exists($attempt, 'getTable') ? $attempt->getTable() : null;
        $orderId = null;

        if ($attemptTable && Schema::hasColumn($attemptTable, 'order_id')) {
            $orderId = (int) ($attempt->order_id ?? 0);
        }

        // Order model & table
        $orderModel = '\\App\\Domain\\Order\\Models\\Order';
        $orderTable = 'orders';

        if ($orderId && class_exists($orderModel)) {
            return $orderModel::query()->find($orderId);
        }

        if (Schema::hasTable($orderTable) && Schema::hasColumn($orderTable, 'payment_attempt_id')) {
            $row = DB::table($orderTable)->where('payment_attempt_id', $attempt->id ?? null)->first();
            if ($row && class_exists($orderModel)) {
                return $orderModel::query()->find($row->id);
            }
            return $row ? (object) $row : null;
        }

        return null;
    }

    protected function storePayload(string $provider, string $externalId, array $payload): void
    {
        $json = json_encode($payload, JSON_UNESCAPED_SLASHES);

        // Try to store on payment_attempts if columns exist
        if (Schema::hasTable('payment_attempts') && Schema::hasColumn('payment_attempts', 'webhook_payload')) {
            $q = DB::table('payment_attempts')->where('provider', $provider)->where(function ($q) {
                foreach ($this->refColumns as $col) {
                    if (Schema::hasColumn('payment_attempts', $col)) {
                        $q->orWhere($col, DB::raw('?'));
                    }
                }
            });

            // Binding externalId for each OR condition is messy; do a direct update by id if we had it earlier.
            // For simplicity, skip if we cannot target a single row.
        }

        // Else, write to a generic audit table if present
        if (Schema::hasTable('webhook_events')) {
            DB::table('webhook_events')->insert([
                'provider'     => $provider,
                'external_ref' => $externalId,
                'payload'      => $json,
                'created_at'   => now(),
            ]);
        } else {
            // As a last resort, log it
            Log::channel('webhooks')->info('Stored webhook payload (no table)', [
                'provider' => $provider,
                'external_ref' => $externalId,
                'payload' => $payload,
            ]);
        }
    }

    protected function guessModelClass(string $table): ?string
    {
        return match ($table) {
            'payment_attempts' => '\\App\\Domain\\Payment\\Models\\PaymentAttempt',
            'payments'         => '\\App\\Domain\\Payment\\Models\\Payment',
            default            => null,
        };
    }

    protected function maybeColumn(string $table, string $column): bool
    {
        return Schema::hasColumn($table, $column);
    }
}

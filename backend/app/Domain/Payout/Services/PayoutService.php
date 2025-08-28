<?php

namespace App\Domain\Payout\Services;

use App\Domain\Payout\Models\Payout;
use App\Domain\Payout\Models\VendorLedgerEntry;
use Illuminate\Support\Facades\DB;

class PayoutService
{
    /**
     * Mark a payout as paid and create a ledger debit for the vendor.
     * Idempotent: if the debit already exists, it won't create duplicates.
     */
    public function markPaid(Payout $payout, array $meta = []): Payout
    {
        return DB::transaction(function () use ($payout, $meta) {
            // Mark payout paid (idempotent)
            if ($payout->status !== 'paid') {
                $payout->status  = 'paid';
                $payout->paid_at = now();
                $payout->meta    = array_filter(array_merge((array) $payout->meta, $meta));
                $payout->save();
            }

            // Create a single debit per payout
            $exists = VendorLedgerEntry::query()
                ->where('context', 'payout_debit')
                ->where('store_id', $payout->store_id)
                ->where('meta->payout_id', $payout->id)
                ->exists();

            if (!$exists) {
                VendorLedgerEntry::create([
                    'store_id' => $payout->store_id,
                    'order_id' => null,
                    'refund_id'=> null,
                    'context'  => 'payout_debit',
                    'type'     => 'debit',
                    'amount'   => (int) $payout->amount,
                    'currency' => $payout->currency ?? 'LBP',
                    'meta'     => [
                        'payout_id' => $payout->id,
                        'note'      => $meta['note'] ?? null,
                        'txid'      => $meta['txid'] ?? null,
                    ],
                ]);
            }

            return $payout->fresh();
        });
    }

    /**
     * Compute balances for one or more stores.
     * Returns [credited, debited, available, currency].
     */
    public function balancesForStores(array $storeIds, string $currency = 'LBP'): array
    {
        $credited = (int) VendorLedgerEntry::query()
            ->whereIn('store_id', $storeIds)
            ->where('type', 'credit')
            ->sum('amount');

        $debited = (int) VendorLedgerEntry::query()
            ->whereIn('store_id', $storeIds)
            ->where('type', 'debit')
            ->sum('amount');

        return [
            'credited'  => $credited,
            'debited'   => $debited,
            'available' => $credited - $debited,
            'currency'  => $currency,
        ];
    }
}

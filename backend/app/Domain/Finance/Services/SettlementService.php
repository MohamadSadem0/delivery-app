<?php

namespace App\Domain\Finance\Services;

use App\Domain\Order\Models\Order;
use App\Domain\Payment\Models\Refund;
use App\Domain\Payout\Models\VendorLedgerEntry;
use Illuminate\Support\Facades\DB;

class SettlementService
{
    /**
     * Credit vendors when an order is paid.
     * Idempotent: skips if credits for this order already exist.
     */
    public function settlePaidOrder(Order $order): void
    {
        // If already credited, skip
        $exists = VendorLedgerEntry::query()
            ->where('order_id', $order->id)
            ->where('context', 'order_paid')
            ->exists();

        if ($exists) return;

        // Build per-store totals from order items
        $items = $order->items()->with(['product:id,store_id'])->get();

        $perStore = [];
        foreach ($items as $it) {
            $storeId = $it->store_id ?? $it->product->store_id ?? null;
            if (!$storeId) continue;

            // assume item total is stored; otherwise compute price * qty - discount
            $line = (int) ($it->total ?? ($it->price * $it->quantity));
            $perStore[$storeId] = ($perStore[$storeId] ?? 0) + $line;
        }

        // Commission percent: default config, override per store if available
        $defaultPct = (float) config('marketplace.commission_percent', 10.0);

        DB::transaction(function () use ($perStore, $order, $defaultPct) {
            foreach ($perStore as $storeId => $gross) {
                $commissionPct = $order->store?->commission_percent // if relation exists
                    ?? optional($order->stores->firstWhere('id', $storeId))->commission_percent
                    ?? $defaultPct;

                $commission = (int) round($gross * ($commissionPct / 100.0));
                $net = $gross - $commission;
                if ($net <= 0) continue;

                VendorLedgerEntry::create([
                    'store_id' => $storeId,
                    'order_id' => $order->id,
                    'context'  => 'order_paid',
                    'type'     => 'credit',
                    'amount'   => $net,
                    'currency' => $order->currency ?? 'LBP',
                    'meta'     => [
                        'gross' => $gross,
                        'commission_pct' => $commissionPct,
                        'commission' => $commission,
                        'order_number' => $order->number ?? $order->id,
                    ],
                ]);
            }
        });
    }

    /**
     * Debit vendors when a refund is processed (successful).
     * Idempotent per refund.
     */
    public function recordRefund(Refund $refund): void
    {
        $exists = VendorLedgerEntry::query()
            ->where('refund_id', $refund->id)
            ->where('context', 'refund_processed')
            ->exists();

        if ($exists) return;

        $order = $refund->order()->with(['items.product:id,store_id'])->firstOrFail();

        // Pro-rate refund across items’ stores by their share of the order total
        $items = $order->items;
        $storeTotals = [];
        $orderItemsTotal = 0;

        foreach ($items as $it) {
            $storeId = $it->store_id ?? $it->product->store_id ?? null;
            if (!$storeId) continue;
            $line = (int) ($it->total ?? ($it->price * $it->quantity));
            $storeTotals[$storeId] = ($storeTotals[$storeId] ?? 0) + $line;
            $orderItemsTotal += $line;
        }

        if ($orderItemsTotal <= 0) return;

        $defaultPct = (float) config('marketplace.commission_percent', 10.0);

        DB::transaction(function () use ($storeTotals, $orderItemsTotal, $refund, $order, $defaultPct) {
            foreach ($storeTotals as $storeId => $storeGross) {
                $share = $storeGross / $orderItemsTotal;
                $refundGrossPart = (int) round($refund->amount * $share);

                $commissionPct = optional($order->stores->firstWhere('id', $storeId))->commission_percent
                    ?? $defaultPct;

                $commissionBack = (int) round($refundGrossPart * ($commissionPct / 100.0));
                $net = $refundGrossPart - $commissionBack;
                if ($net <= 0) continue;

                VendorLedgerEntry::create([
                    'store_id' => $storeId,
                    'order_id' => $order->id,
                    'refund_id'=> $refund->id,
                    'context'  => 'refund_processed',
                    'type'     => 'debit',
                    'amount'   => $net,
                    'currency' => $refund->currency ?? ($order->currency ?? 'LBP'),
                    'meta'     => [
                        'refund_amount' => (int) $refund->amount,
                        'store_share' => $refundGrossPart,
                        'commission_pct' => $commissionPct,
                        'commission_reversed' => $commissionBack,
                    ],
                ]);
            }
        });
    }
}

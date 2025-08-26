<?php

namespace App\Domain\Payout\Services;

use App\Domain\Payout\Models\Payout;
use App\Domain\Store\Models\Store;
use App\Domain\Order\Models\OrderItem;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class PayoutService
{
    public function calculateForStore(int $storeId, Carbon $from, Carbon $to): array
    {
        // Sum delivered order items for the store in the period
        $gross = (int) OrderItem::query()
            ->where('store_id', $storeId)
            ->whereBetween('created_at', [$from, $to])
            ->whereHas('order', fn($q) => $q->where('status', 'delivered'))
            ->sum('line_total');

        $commissionRate = (float) config('payouts.commission_rate', 0.1);
        $commission = (int) round($gross * $commissionRate);
        $net = max(0, $gross - $commission);

        return [
            'gross' => $gross,
            'commission' => $commission,
            'net' => $net,
            'currency' => 'LBP',
        ];
    }

    public function createPayout(int $storeId, Carbon $from, Carbon $to): Payout
    {
        $calc = $this->calculateForStore($storeId, $from, $to);

        return Payout::create([
            'store_id' => $storeId,
            'period_start' => $from,
            'period_end' => $to,
            'gross_amount' => $calc['gross'],
            'commission_amount' => $calc['commission'],
            'net_amount' => $calc['net'],
            'currency' => $calc['currency'],
            'status' => 'pending',
            'meta' => ['rate' => config('payouts.commission_rate', 0.1)],
        ]);
    }

    public function markPaid(Payout $payout, array $meta = []): Payout
    {
        $payout->status = 'paid';
        $payout->meta = array_merge($payout->meta ?? [], $meta);
        $payout->save();

        return $payout;
    }
}

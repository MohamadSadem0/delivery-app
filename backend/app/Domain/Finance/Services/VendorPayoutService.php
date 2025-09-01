<?php

namespace App\Domain\Finance\Services;

use App\Domain\Finance\Models\VendorPayout;
use App\Domain\Store\Models\Store;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class VendorPayoutService
{
    public function schedule(Store $store, int $amount, string $currency = 'LBP'): VendorPayout
    {
        if ($amount <= 0) throw new RuntimeException('Invalid payout amount');

        return VendorPayout::create([
            'store_id' => $store->id,
            'amount' => $amount,
            'currency' => $currency,
            'status' => 'scheduled',
            'scheduled_at' => now()->addDays(1),
        ]);
    }

    public function process(VendorPayout $payout, array $meta = []): VendorPayout
    {
        if ($payout->status !== 'scheduled') throw new RuntimeException('Payout not scheduled');
        $payout->status = 'processed';
        $payout->processed_at = now();
        $payout->meta = $meta;
        $payout->save();
        return $payout;
    }
}

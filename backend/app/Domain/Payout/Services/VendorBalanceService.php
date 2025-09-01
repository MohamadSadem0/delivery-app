<?php

namespace App\Domain\Payout\Services;

use App\Domain\Payout\Models\VendorBalance;
use Illuminate\Support\Facades\DB;

class VendorBalanceService
{
    public function getBalance(int $storeId): VendorBalance
    {
        return VendorBalance::firstOrCreate(['store_id'=>$storeId],['balance'=>0,'currency'=>'LBP']);
    }

    public function credit(int $storeId, int $amount): VendorBalance
    {
        return DB::transaction(function () use ($storeId, $amount) {
            $vb = $this->getBalance($storeId);
            $vb->balance += $amount;
            $vb->save();
            return $vb;
        });
    }

    public function debit(int $storeId, int $amount): VendorBalance
    {
        return DB::transaction(function () use ($storeId, $amount) {
            $vb = $this->getBalance($storeId);
            if ($vb->balance < $amount) {
                throw new \RuntimeException('Insufficient balance');
            }
            $vb->balance -= $amount;
            $vb->save();
            return $vb;
        });
    }
}

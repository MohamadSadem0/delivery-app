<?php

namespace App\Http\Controllers\API\V1\Vendor;

use App\Http\Controllers\Controller;
use App\Domain\Payout\Models\Payout;
use App\Domain\Payout\Models\VendorLedgerEntry;
use App\Domain\Payout\Services\PayoutService;
use App\Domain\Store\Models\Store;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    public function __construct(protected PayoutService $payouts) {}

    protected function vendorStoreIds(): array
    {
        $uid = auth('api')->id();
        return Store::query()->where('user_id', $uid)->pluck('id')->all();
    }

    public function show()
    {
        $storeIds = $this->vendorStoreIds();
        abort_if(empty($storeIds), 404, 'No store found for vendor');

        $balances = $this->payouts->balancesForStores($storeIds, 'LBP');

        $pending = (int) Payout::query()
            ->whereIn('store_id', $storeIds)
            ->whereIn('status', ['requested','processing'])
            ->sum('amount');

        return response()->json([
            'available'                => $balances['available'],
            'credited'                 => $balances['credited'],
            'debited'                  => $balances['debited'],
            'pending_payouts'          => $pending,
            'available_after_pending'  => $balances['available'] - $pending,
            'currency'                 => $balances['currency'],
        ]);
    }

    public function ledger(Request $request)
    {
        $storeIds = $this->vendorStoreIds();
        abort_if(empty($storeIds), 404, 'No store found for vendor');

        $q = VendorLedgerEntry::query()
            ->whereIn('store_id', $storeIds)
            ->orderByDesc('id');

        if ($ctx = $request->string('context')->toString()) {
            $q->where('context', $ctx);
        }
        if ($type = $request->string('type')->toString()) {
            $q->where('type', $type);
        }

        return response()->json($q->paginate(50));
    }
}

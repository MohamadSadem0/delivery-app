<?php

namespace App\Http\Controllers\API\V1\Vendor;

use App\Http\Controllers\Controller;
use App\Domain\Payout\Models\Payout;
use App\Domain\Payout\Services\PayoutService;
use App\Domain\Store\Models\Store;
use Illuminate\Http\Request;

class PayoutController extends Controller
{
    public function __construct(protected PayoutService $payouts) {}

    protected function vendorStoreIds(): array
    {
        $uid = auth('api')->id();
        return Store::query()->where('user_id', $uid)->pluck('id')->all();
    }

    public function index(Request $request)
    {
        $storeIds = $this->vendorStoreIds();
        if (empty($storeIds)) {
            return response()->json(['data' => [], 'meta' => ['message' => 'No store found for vendor']]);
        }

        $q = Payout::query()->whereIn('store_id', $storeIds)->orderByDesc('id');

        if ($status = $request->string('status')->toString()) {
            $q->where('status', $status);
        }

        return response()->json($q->paginate(50));
    }

    public function show(Payout $payout)
    {
        $storeIds = $this->vendorStoreIds();
        abort_unless(in_array($payout->store_id, $storeIds, true), 404);
        return response()->json($payout);
    }

    public function request(Request $request)
    {
        $data = $request->validate([
            'store_id' => ['required','integer'],
            'amount'   => ['required','integer','min:1'], // minor units
            'currency' => ['nullable','string','size:3'],
            'note'     => ['nullable','string','max:500'],
        ]);

        $storeIds = $this->vendorStoreIds();
        abort_unless(in_array($data['store_id'], $storeIds, true), 404, 'Store not found for vendor');

        // current balances
        $balances = $this->payouts->balancesForStores([$data['store_id']], strtoupper($data['currency'] ?? 'LBP'));

        // pending payout sum for this store
        $pending = Payout::query()
            ->where('store_id', $data['store_id'])
            ->whereIn('status', ['requested','processing'])
            ->sum('amount');

        $availableAfterPending = $balances['available'] - (int) $pending;

        if ($data['amount'] > $availableAfterPending) {
            return response()->json([
                'message' => 'Requested amount exceeds available funds',
                'available' => $balances['available'],
                'pending'   => (int) $pending,
                'available_after_pending' => $availableAfterPending,
                'currency'  => $balances['currency'],
            ], 422);
        }

        $payout = Payout::create([
            'store_id' => $data['store_id'],
            'amount'   => (int) $data['amount'],
            'currency' => strtoupper($data['currency'] ?? $balances['currency']),
            'status'   => 'requested',
            'meta'     => array_filter(['note' => $data['note'] ?? null]),
        ]);

        return response()->json(['message' => 'Payout requested', 'payout' => $payout], 201);
    }
}

<?php

namespace App\Http\Controllers\API\V1\Vendor;

use App\Http\Controllers\Controller;
use App\Domain\Store\Models\Store;
use App\Domain\Payout\Models\Payout;
use App\Domain\Payout\Services\PayoutService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class PayoutController extends Controller
{
    public function __construct(protected PayoutService $payouts) {}

    protected function vendorStoreId(): int
    {
        $store = Store::where('user_id', auth('api')->id())->firstOrFail();
        return (int) $store->id;
    }

    public function index()
    {
        $storeId = $this->vendorStoreId();
        $payouts = Payout::where('store_id', $storeId)->orderByDesc('id')->paginate(20);
        return response()->json($payouts);
    }

    public function show(Payout $payout)
    {
        abort_unless($payout->store->user_id === auth('api')->id(), 404);
        return response()->json($payout);
    }

    public function request(Request $request)
    {
        $storeId = $this->vendorStoreId();

        $data = $request->validate([
            'from' => ['nullable','date'],
            'to' => ['nullable','date'],
        ]);

        $from = isset($data['from']) ? Carbon::parse($data['from']) : now()->startOfMonth()->subMonth();
        $to   = isset($data['to']) ? Carbon::parse($data['to']) : now()->startOfMonth()->subSecond();

        $min = (int) config('payouts.min_payout_amount', 0);

        $calc = $this->payouts->calculateForStore($storeId, $from, $to);
        if ($calc['net'] < $min) {
            return response()->json(['message' => 'Payout below minimum threshold','net'=>$calc['net']], 422);
        }

        $payout = $this->payouts->createPayout($storeId, $from, $to);

        return response()->json(['message' => 'Payout requested','payout'=>$payout], 201);
    }
}

<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Payout\Models\Payout;
use App\Domain\Payout\Services\PayoutService;
use Illuminate\Http\Request;

class PayoutAdminController extends Controller
{
    public function __construct(protected PayoutService $payouts) {}

    public function index(Request $request)
    {
        $q = Payout::query()->orderByDesc('id');

        if ($status = $request->string('status')->toString()) {
            $q->where('status', $status);
        }
        if ($store = $request->integer('store_id')) {
            $q->where('store_id', $store);
        }

        return response()->json($q->paginate(50));
    }

    public function markPaid(Payout $payout, Request $request)
    {
        $meta = $request->only(['txid','note']);
        $payout = $this->payouts->markPaid($payout, $meta);

        return response()->json(['message' => 'Payout marked as paid','payout'=>$payout]);
    }
}

<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Payment\Models\Refund;
use App\Domain\Payment\Services\RefundService;
use Illuminate\Http\Request;

class RefundController extends Controller
{
    public function __construct(protected RefundService $refunds) {}

    public function index(Request $request)
    {
        $q = Refund::query()->orderByDesc('id');
        if ($status = $request->string('status')->toString()) {
            $q->where('status', $status);
        }
        return response()->json($q->paginate(50));
    }

    public function show(Refund $refund)
    {
        return response()->json($refund);
    }

    public function approve(Refund $refund)
    {
        $refund = $this->refunds->approve($refund);
        return response()->json(['message' => 'Refund approved','refund' => $refund]);
    }

    public function decline(Refund $refund, Request $request)
    {
        $refund = $this->refunds->decline($refund, $request->string('reason')->toString());
        return response()->json(['message' => 'Refund declined','refund' => $refund]);
    }

    public function process(Refund $refund)
    {
        $refund = $this->refunds->process($refund);
        return response()->json(['message' => 'Refund processed','refund' => $refund]);
    }
}

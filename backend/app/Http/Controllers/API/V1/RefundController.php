<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Order\Models\Order;
use App\Domain\Payment\Services\RefundService;
use Illuminate\Http\Request;

class RefundController extends Controller
{
    public function __construct(protected RefundService $refunds) {}

    public function requestRefund(Request $request, Order $order)
    {
        if ($order->user_id !== auth('api')->id()) {
            abort(404);
        }

        $data = $request->validate([
            'amount' => ['required','integer','min:1'],
            'reason' => ['nullable','string','max:1000'],
        ]);

        $refund = $this->refunds->requestRefund($order, (int)$data['amount'], $data['reason'] ?? null);

        return response()->json(['message' => 'Refund requested', 'refund' => $refund], 201);
    }
}

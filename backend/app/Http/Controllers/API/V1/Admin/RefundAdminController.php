<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Payment\Models\Refund;
use App\Domain\Payment\Models\Payment;
use App\Domain\Payment\Services\RefundService;
use Illuminate\Http\Request;

class RefundAdminController extends Controller
{
    public function __construct(protected RefundService $refunds) {}

    public function index(Request $request)
    {
        $q = Refund::query()->orderByDesc('id');

        if ($status = $request->string('status')->toString()) {
            $q->where('status', $status);
        }
        if ($orderId = $request->integer('order_id')) {
            $q->where('order_id', $orderId);
        }

        return response()->json($q->paginate(50));
    }

    public function approve(Request $request, Refund $refund)
    {
        // optionally bind to a specific payment; otherwise pick latest successful
        $paymentId = $request->integer('payment_id') ?: null;
        $payment = null;

        if ($paymentId) {
            $payment = Payment::query()
                ->whereKey($paymentId)
                ->where('order_id', $refund->order_id)
                ->firstOrFail();
        }

        if (!$payment) {
            $payment = Payment::query()
                ->where('order_id', $refund->order_id)
                ->whereIn('status', ['succeeded','captured','paid'])
                ->orderByDesc('id')
                ->first();
        }

        $this->refunds->approve($refund, $payment);

        return response()->json([
            'message' => 'Refund approved',
            'refund'  => $refund->fresh(),
        ]);
    }

    public function decline(Request $request, Refund $refund)
    {
        $data = $request->validate([
            'reason' => ['nullable','string','max:1000'],
        ]);

        $this->refunds->decline($refund, $data['reason'] ?? null);

        return response()->json([
            'message' => 'Refund declined',
            'refund'  => $refund->fresh(),
        ]);
    }

    public function process(Refund $refund)
    {
        // Calls gateway and persists result/meta (uses payment from approve() or resolves latest)
        $this->refunds->process($refund);

        return response()->json([
            'message' => 'Refund processed',
            'refund'  => $refund->fresh(),
        ]);
    }
}

<?php

namespace App\Domain\Payment\Services;

use App\Domain\Order\Models\Order;
use App\Domain\Payment\Models\Refund;
use App\Domain\Payment\Models\Payment;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class RefundService
{
    public function requestRefund(Order $order, int $amount, ?string $reason = null): Refund
    {
        if (!in_array((string)$order->status, ['processing','shipped','delivered'], true)) {
            throw new RuntimeException('Refund not allowed for current order status');
        }

        if ($amount <= 0 || $amount > (int)$order->total) {
            throw new RuntimeException('Invalid refund amount');
        }

        return Refund::create([
            'order_id' => $order->id,
            'amount' => $amount,
            'currency' => $order->currency ?? 'LBP',
            'status' => 'requested',
            'reason' => $reason,
        ]);
    }

    public function approve(Refund $refund, ?Payment $payment = null): Refund
    {
        $refund->status = 'approved';
        if ($payment) $refund->payment_id = $payment->id;
        $refund->save();
        return $refund;
    }

    public function decline(Refund $refund, ?string $reason = null): Refund
    {
        $refund->status = 'declined';
        if ($reason) $refund->reason = $reason;
        $refund->save();
        return $refund;
    }

    public function process(Refund $refund, array $gatewayMeta = []): Refund
    {
        if ($refund->status !== 'approved') {
            throw new RuntimeException('Refund must be approved before processing');
        }

        // TODO: call gateway API to issue refund using $refund->payment_id if present

        $refund->status = 'processed';
        $refund->meta = $gatewayMeta ?: null;
        $refund->save();

        return $refund;
    }
}

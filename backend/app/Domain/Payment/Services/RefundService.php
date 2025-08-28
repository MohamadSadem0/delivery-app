<?php

namespace App\Domain\Payment\Services;

use App\Domain\Order\Models\Order;
use App\Domain\Payment\Models\Refund;
use App\Domain\Payment\Models\Payment;
use App\Services\Integrations\Payments\StripeGateway;
use App\Services\Integrations\Payments\HyperPayGateway;
use App\Services\Integrations\Payments\TapGateway;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class RefundService
{
    public function requestRefund(Order $order, int $amount, ?string $reason = null): Refund
    {
        if (!in_array((string) $order->status, ['processing', 'shipped', 'delivered'], true)) {
            throw new RuntimeException('Refund not allowed for current order status');
        }

        if ($amount <= 0 || $amount > (int) $order->total) {
            throw new RuntimeException('Invalid refund amount');
        }

        return Refund::create([
            'order_id'  => $order->id,
            'amount'    => $amount,
            'currency'  => $order->currency ?? 'LBP',
            'status'    => 'requested',
            'reason'    => $reason,
        ]);
    }

 public function approve(Refund $refund, ?Payment $payment = null): Refund
{
    $refund->status = 'approved';
    if ($payment) {
        $refund->payment_id = $payment->id;
    }
    $refund->save();
    return $refund;
}

public function decline(Refund $refund, ?string $reason = null): Refund
{
    $refund->status = 'declined';
    if ($reason) {
        $refund->reason = $reason;
    }
    $refund->save();
    return $refund;
}

public function process(Refund $refund, array $gatewayMeta = []): Refund
{
    if ($refund->status !== 'approved') {
        throw new RuntimeException('Refund must be approved before processing');
    }

    return DB::transaction(function () use ($refund, $gatewayMeta) {
        $payment = $refund->payment ?: Payment::query()
            ->where('order_id', $refund->order_id)
            ->whereIn('status', ['succeeded', 'captured', 'paid'])
            ->orderByDesc('id')
            ->first();

        if (!$payment) {
            throw new RuntimeException('No successful payment found for this order to refund against');
        }

        $provider = strtolower((string) $payment->provider);
        $gateway = match ($provider) {
            'stripe'   => new StripeGateway(),
            'hyperpay' => new HyperPayGateway(),
            'tap'      => new TapGateway(),
            default    => throw new RuntimeException("Unsupported payment provider: {$provider}"),
        };

        try {
            $resp = $gateway->refund($payment, (int) $refund->amount);

            $status = $resp['status'] ?? 'processing';
            $refund->status = $status === 'succeeded' ? 'processed' : ($status === 'failed' ? 'failed' : 'processing');
            $refund->payment_id = $payment->id;
            $refund->meta = array_filter([
                ...$gatewayMeta,
                'provider' => $provider,
                'provider_refund_id' => $resp['provider_refund_id'] ?? null,
                'raw' => $resp['raw'] ?? null,
            ], fn ($v) => $v !== null);
            $refund->save();

            // 🔗 Only when processed, record the vendor debits
            if ($refund->status === 'processed') {
                app(\App\Domain\Finance\Services\SettlementService::class)->recordRefund($refund);
            }

        } catch (\Throwable $e) {
            $refund->status = 'failed';
            $refund->meta = [
                ...$gatewayMeta,
                'provider' => $provider,
                'error' => $e->getMessage(),
            ];
            $refund->save();
            throw $e;
        }

        return $refund;
    });
}

}

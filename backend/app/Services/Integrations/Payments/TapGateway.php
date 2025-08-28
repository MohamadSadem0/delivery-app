<?php

namespace App\Services\Integrations\Payments;

use App\Domain\Order\Models\Order;

class TapGateway
{
    public function createIntent(Order $order): array
    {
        return [
            'tap_transaction_id'  => 'tap_' . $order->id,
            'provider_payment_id' => 'tap_' . $order->id, // normalized key
            'amount'              => $order->total,
            'currency'            => $order->currency ?? 'LBP',
        ];
    }

    public function handleWebhook(array $payload): array
    {
        return [
            'status'               => $payload['status'] ?? 'pending',
            'provider_payment_id'  => $payload['id'] ?? $payload['tap_transaction_id'] ?? null,
            'raw'                  => $payload,
        ];
    }

    public function refund(\App\Domain\Payment\Models\Payment $payment, int $amount): array
    {
        return [
            'status' => 'succeeded',
            'provider_refund_id' => 'tap_ref_' . $payment->id,
            'raw' => [
                'payment_id' => $payment->provider_payment_id ?? null,
                'amount' => $amount,
                'currency' => $payment->currency ?? 'LBP',
            ],
        ];
    }
}

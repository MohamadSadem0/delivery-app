<?php

namespace App\Services\Integrations\Payments;

use App\Domain\Order\Models\Order;

class HyperPayGateway
{
    public function createIntent(Order $order): array
    {
        return [
            'checkout_id'         => 'hyperpay_' . $order->id,
            'provider_payment_id' => 'hyperpay_' . $order->id, // normalized key
            'amount'              => $order->total,
            'currency'            => $order->currency ?? 'LBP',
        ];
    }

    public function handleWebhook(array $payload): array
    {
        return [
            'status'               => $payload['result']['code'] ?? 'pending',
            'provider_payment_id'  => $payload['id'] ?? $payload['checkout_id'] ?? null,
            'raw'                  => $payload,
        ];
    }

    public function refund(\App\Domain\Payment\Models\Payment $payment, int $amount): array
    {
        return [
            'status' => 'succeeded',
            'provider_refund_id' => 'hp_ref_' . $payment->id,
            'raw' => [
                'payment_id' => $payment->provider_payment_id ?? null,
                'amount' => $amount,
                'currency' => $payment->currency ?? 'LBP',
            ],
        ];
    }
}

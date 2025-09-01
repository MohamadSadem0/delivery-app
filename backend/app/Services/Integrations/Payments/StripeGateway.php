<?php

namespace App\Services\Integrations\Payments;

use App\Domain\Order\Models\Order;

class StripeGateway
{
    public function createIntent(Order $order): array
    {
        // Example payload structure (dev stub)
        return [
            'client_secret'       => 'test_secret_' . $order->id,
            'payment_intent'      => 'pi_' . $order->id,   // add this if you don’t have real Stripe IDs yet
            'provider_payment_id' => 'pi_' . $order->id,   // normalized key
            'amount'              => $order->total,
            'currency'            => $order->currency ?? 'LBP',
        ];
    }

    public function handleWebhook(array $payload): array
    {
        return [
            'status'               => 'succeeded',
            'provider_payment_id'  => $payload['id'] ?? ($payload['data']['object']['id'] ?? null),
            'raw'                  => $payload,
        ];
    }

    public function refund(\App\Domain\Payment\Models\Payment $payment, int $amount): array
    {
        return [
            'status' => 'succeeded',
            'provider_refund_id' => 're_' . $payment->id,
            'raw' => [
                'payment_id' => $payment->provider_payment_id ?? null,
                'amount' => $amount,
                'currency' => $payment->currency ?? 'LBP',
            ],
        ];
    }
}

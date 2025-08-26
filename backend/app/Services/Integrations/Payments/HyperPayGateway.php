<?php

namespace App\Services\Integrations\Payments;

use App\Domain\Order\Models\Order;

class HyperPayGateway
{
    public function createIntent(Order $order): array
    {
        return [
            'checkout_id' => 'hyperpay_' . $order->id,
            'amount' => $order->total,
            'currency' => $order->currency ?? 'LBP',
        ];
    }

    public function handleWebhook(array $payload): array
    {
        return ['status' => $payload['result']['code'] ?? 'pending'];
    }
}

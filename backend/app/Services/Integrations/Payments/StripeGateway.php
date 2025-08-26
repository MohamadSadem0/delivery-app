<?php

namespace App\Services\Integrations\Payments;

use App\Domain\Order\Models\Order;

class StripeGateway
{
    public function createIntent(Order $order): array
    {
        // Example payload structure
        return [
            'client_secret' => 'test_secret_' . $order->id,
            'amount' => $order->total,
            'currency' => $order->currency ?? 'LBP',
        ];
    }

    public function handleWebhook(array $payload): array
    {
        // parse stripe webhook
        return ['status' => 'succeeded', 'provider_payment_id' => $payload['id'] ?? null];
    }
}

<?php

namespace App\Services\Integrations\Payments;

use App\Domain\Order\Models\Order;

class TapGateway
{
    public function createIntent(Order $order): array
    {
        return [
            'tap_transaction_id' => 'tap_' . $order->id,
            'amount' => $order->total,
            'currency' => $order->currency ?? 'LBP',
        ];
    }

    public function handleWebhook(array $payload): array
    {
        return ['status' => $payload['status'] ?? 'pending'];
    }
}

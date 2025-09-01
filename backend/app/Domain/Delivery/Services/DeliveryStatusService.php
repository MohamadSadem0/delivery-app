<?php

namespace App\Domain\Delivery\Services;

use App\Domain\Delivery\Models\Delivery;

class DeliveryStatusService
{
    public function fetch(Delivery $delivery): array
    {
        // Placeholder: call courier APIs and normalize response
        return [
            'status' => $delivery->status,
            'tracking_number' => $delivery->tracking_number,
            'courier' => $delivery->courier,
            'estimated_delivery' => optional($delivery->eta_at)->toIso8601String(),
            'checkpoints' => $delivery->meta['checkpoints'] ?? [],
        ];
    }
}

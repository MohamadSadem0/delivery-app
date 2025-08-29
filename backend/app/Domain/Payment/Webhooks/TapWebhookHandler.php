<?php

namespace App\Domain\Payment\Webhooks;

use App\Domain\Payment\Services\PaymentUpdateService;

class TapWebhookHandler
{
    public function __construct(protected PaymentUpdateService $updates) {}

    public function handle(array $event): void
    {
        // TAP payloads often look like:
        // { "id": "...", "status": "CAPTURED|FAILED|CANCELLED|INITIATED|DECLINED|REFUNDED", "amount": 12.34, "currency": "USD", ... }
        $status   = strtoupper((string) ($event['status'] ?? ''));
        $id       = (string) ($event['id'] ?? ($event['charge_id'] ?? ''));
        $currency = isset($event['currency']) ? strtoupper((string)$event['currency']) : null;
        $amount   = isset($event['amount']) ? (int) round(((float)$event['amount']) * 100) : null;

        if ($id === '') return;

        if ($status === 'CAPTURED' || $status === 'SUCCESS') {
            $this->updates->markPaid('tap', $id, $amount, $currency, $event);
        } elseif (in_array($status, ['FAILED','DECLINED','CANCELLED'], true)) {
            $this->updates->markFailed('tap', $id, $status, 'Tap charge failed', $event);
        } elseif ($status === 'REFUNDED') {
            $this->updates->markRefunded('tap', $id, $amount, $currency, $event);
        }
    }
}

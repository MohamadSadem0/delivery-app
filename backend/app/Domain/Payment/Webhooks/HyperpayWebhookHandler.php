<?php

namespace App\Domain\Payment\Webhooks;

use App\Domain\Payment\Services\PaymentUpdateService;

class HyperpayWebhookHandler
{
    public function __construct(protected PaymentUpdateService $updates) {}

    public function handle(array $event): void
    {
        // Typical Hyperpay result:
        // { "id": "...", "merchantTransactionId": "...", "result": { "code": "000.000.000", "description": "Success" }, "amount": "12.34", "currency": "USD" }
        $code   = (string) ($event['result']['code'] ?? '');
        $ok     = str_starts_with($code, '000.');
        $ref    = (string) ($event['merchantTransactionId'] ?? $event['id'] ?? '');
        $amount = isset($event['amount']) ? (int) round(((float)$event['amount']) * 100) : null;
        $currency = isset($event['currency']) ? strtoupper((string)$event['currency']) : null;

        if ($ref === '') return;

        if ($ok) {
            $this->updates->markPaid('hyperpay', $ref, $amount, $currency, $event);
        } else {
            $this->updates->markFailed('hyperpay', $ref, $code, (string)($event['result']['description'] ?? 'failed'), $event);
        }
    }
}

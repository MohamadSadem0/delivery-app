<?php

namespace App\Domain\Payment\Webhooks;

use App\Domain\Payment\Services\PaymentUpdateService;

class StripeWebhookHandler
{
    public function __construct(protected PaymentUpdateService $updates) {}

    public function handle(array $event): void
    {
        $type = (string) ($event['type'] ?? '');
        $object = $event['data']['object'] ?? [];

        switch ($type) {
            case 'payment_intent.succeeded':
                $intentId = (string) ($object['id'] ?? '');
                $amount   = isset($object['amount_received']) ? (int) $object['amount_received'] : null;
                $currency = isset($object['currency']) ? strtoupper((string)$object['currency']) : null;
                if ($intentId !== '') {
                    $this->updates->markPaid('stripe', $intentId, $amount, $currency, $event);
                }
                break;

            case 'payment_intent.payment_failed':
                $intentId = (string) ($object['id'] ?? '');
                $code     = (string) ($object['last_payment_error']['code'] ?? 'failed');
                $message  = (string) ($object['last_payment_error']['message'] ?? 'Payment failed');
                if ($intentId !== '') {
                    $this->updates->markFailed('stripe', $intentId, $code, $message, $event);
                }
                break;

            case 'charge.refunded':
            case 'charge.refund.updated':
                $chargeId = (string) ($object['id'] ?? '');
                $currency = isset($object['currency']) ? strtoupper((string)$object['currency']) : null;
                $amount   = isset($object['amount_refunded']) ? (int) $object['amount_refunded'] : null;
                // Try payment_intent first if present
                $intentId = (string) ($object['payment_intent'] ?? '');
                $ref = $intentId !== '' ? $intentId : $chargeId;
                if ($ref !== '') {
                    $this->updates->markRefunded('stripe', $ref, $amount, $currency, $event);
                }
                break;

            default:
                // Non-critical events are ignored safely.
                break;
        }
    }
}

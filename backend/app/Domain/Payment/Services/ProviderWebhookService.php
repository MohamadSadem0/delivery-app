<?php

namespace App\Domain\Payment\Services;

use App\Domain\Payment\Webhooks\StripeWebhookHandler;
use App\Domain\Payment\Webhooks\TapWebhookHandler;
use App\Domain\Payment\Webhooks\HyperpayWebhookHandler;
use InvalidArgumentException;

class ProviderWebhookService
{
    public function __construct(
        protected PaymentUpdateService $updates,
        protected StripeWebhookHandler $stripe,
        protected TapWebhookHandler $tap,
        protected HyperpayWebhookHandler $hyperpay,
    ) {}

    public function handle(string $provider, array $event): void
    {
        match ($provider) {
            'stripe'   => $this->stripe->handle($event),
            'tap'      => $this->tap->handle($event),
            'hyperpay' => $this->hyperpay->handle($event),
            default    => throw new InvalidArgumentException("Unsupported provider: {$provider}"),
        };
    }
}

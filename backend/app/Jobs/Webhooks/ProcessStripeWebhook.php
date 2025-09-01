<?php

namespace App\Jobs\Webhooks;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ProcessStripeWebhook implements ShouldQueue
{
    use Dispatchable, Queueable;

    public function __construct(public array $event) {}

    public function handle(): void
    {
        // TODO: implement mapping to internal events / orders
    }
}

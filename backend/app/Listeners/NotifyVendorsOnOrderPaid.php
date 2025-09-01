<?php

namespace App\Listeners;

use App\Events\OrderPaid;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyVendorsOnOrderPaid implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(OrderPaid $event): void
    {
        // In production: notify vendor users linked to products in this order
        \Log::info("OrderPaid event received for Order ID: {$event->order->id}");
    }
}

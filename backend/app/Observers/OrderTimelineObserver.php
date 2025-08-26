<?php

namespace App\Observers;

use App\Domain\Order\Models\Order;
use App\Domain\Order\Models\OrderTimeline;

class OrderTimelineObserver
{
    public function updated(Order $order): void
    {
        if ($order->wasChanged('status')) {
            OrderTimeline::create([
                'order_id' => $order->id,
                'event' => 'status_changed',
                'data' => [
                    'from' => $order->getOriginal('status'),
                    'to' => $order->status,
                ],
            ]);
        }
    }
}

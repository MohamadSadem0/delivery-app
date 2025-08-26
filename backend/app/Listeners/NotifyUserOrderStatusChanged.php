<?php

namespace App\Listeners;

use App\Events\OrderStatusUpdated;
use App\Notifications\OrderStatusChanged;

class NotifyUserOrderStatusChanged
{
    public function handle(OrderStatusUpdated $event): void
    {
        $event->order->user->notify(new OrderStatusChanged($event->order));
    }
}

<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Domain\Order\Models\Order;
use App\Events\OrderStatusUpdated;

class UpdateOrderStatus implements ShouldQueue
{
    use Dispatchable, Queueable;

    public function __construct(public int $orderId, public string $status) {}

    public function handle(): void
    {
        $order = Order::find($this->orderId);
        if (!$order) return;
        $order->status = $this->status;
        $order->save();

        event(new OrderStatusUpdated($order));
    }
}

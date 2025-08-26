<?php

use App\Jobs\UpdateOrderStatus;
use App\Domain\Order\Models\Order;

it('dispatches an order status update job', function () {
    $order = Order::factory()->create(['status' => 'pending_payment']);
    UpdateOrderStatus::dispatch($order->id, 'paid');
    $this->assertDatabaseHas('orders',['id'=>$order->id,'status'=>'paid']);
});

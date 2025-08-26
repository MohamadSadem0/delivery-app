<?php

use App\Domain\Order\Models\Order;
use App\Domain\Payment\Models\Payment;

it('handles a payment webhook', function () {
    $order = Order::factory()->create(['status' => 'pending_payment','total'=>10000]);
    $payment = Payment::factory()->create(['order_id'=>$order->id,'status'=>'pending']);

    $payload = ['provider' => 'stripe','id'=>'pi_123','order_id'=>$order->id];

    $this->postJson('/api/v1/payments/webhook', $payload)->assertOk();

    $this->assertDatabaseHas('payments',['order_id'=>$order->id,'status'=>'succeeded']);
});

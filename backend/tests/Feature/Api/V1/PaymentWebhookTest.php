<?php

use App\Domain\Order\Models\Order;
use App\Domain\Payment\Models\Payment;

it('processes payment webhook', function () {
    $order = Order::factory()->create(['status' => 'pending_payment', 'total' => 10000]);
    $payment = Payment::factory()->create(['order_id' => $order->id, 'amount' => 10000, 'status' => 'pending']);

    $payload = ['provider' => 'stripe','order_id'=>$order->id,'id'=>'pi_123'];
    $this->postJson('/api/v1/payments/webhook', $payload)->assertOk();

    $payment->refresh();
    expect($payment->status)->not->toBe('pending');
});

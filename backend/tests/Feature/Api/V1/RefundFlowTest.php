<?php

use App\Domain\Order\Models\Order;
use App\Domain\Payment\Models\Refund;
use App\Domain\Payment\Services\RefundService;

it('creates, approves, and processes a refund', function () {
    $order = Order::factory()->create(['status'=>'delivered','total'=>20000]);
    $service = app(RefundService::class);

    $refund = $service->requestRefund($order, 5000, 'test');
    expect($refund->status)->toBe('requested');

    $refund = $service->approve($refund);
    expect($refund->status)->toBe('approved');

    $refund = $service->process($refund,['gateway'=>'mock']);
    expect($refund->status)->toBe('processed');
});

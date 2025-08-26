<?php

use App\Jobs\UpdateOrderStatus;
use Illuminate\Support\Facades\Queue;

it('dispatches UpdateOrderStatus job', function () {
    Queue::fake();

    dispatch(new UpdateOrderStatus(1, 'processing'));

    Queue::assertPushed(UpdateOrderStatus::class, function ($job) {
        return $job->orderId === 1 && $job->status === 'processing';
    });
});

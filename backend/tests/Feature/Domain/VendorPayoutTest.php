<?php

use App\Domain\Store\Models\Store;
use App\Domain\Finance\Services\VendorPayoutService;

it('schedules and processes vendor payout', function () {
    $store = Store::factory()->create();
    $service = app(VendorPayoutService::class);

    $payout = $service->schedule($store, 100000);
    expect($payout->status)->toBe('scheduled');

    $payout = $service->process($payout, ['gateway'=>'mock']);
    expect($payout->status)->toBe('processed');
});

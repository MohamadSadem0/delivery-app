<?php

use App\Domain\User\Models\User;
use App\Domain\Order\Models\Coupon;
use App\Domain\Order\Services\CouponRedemptionService;

it('enforces coupon usage limits', function () {
    $coupon = Coupon::create([
        'code' => 'ONETIME',
        'type' => 'fixed',
        'value' => 10000,
        'usage_limit' => 1,
        'is_active' => true,
    ]);

    $service = app(CouponRedemptionService::class);
    expect($service->canUse($coupon, 1))->toBeTrue();

    $service->redeem($coupon, 1, 101, 10000);

    expect($service->canUse($coupon, 2))->toBeFalse(); // global limit reached
});

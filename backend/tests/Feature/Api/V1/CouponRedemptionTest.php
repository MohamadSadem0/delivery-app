<?php

use App\Domain\Order\Models\Coupon;
use App\Domain\Order\Services\CouponServiceExtended;

it('records a coupon redemption', function () {
    $coupon = Coupon::factory()->create(['type'=>'fixed','value'=>1000]);
    $service = new CouponServiceExtended();
    $service->recordRedemption($coupon, 1, 1, 1000);

    $this->assertDatabaseHas('coupon_redemptions',[
        'coupon_id'=>$coupon->id,
        'user_id'=>1,
        'order_id'=>1,
        'amount_discounted'=>1000,
    ]);
});

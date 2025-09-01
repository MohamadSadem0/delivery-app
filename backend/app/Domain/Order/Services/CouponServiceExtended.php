<?php

namespace App\Domain\Order\Services;

use App\Domain\Order\Models\Coupon;
use App\Domain\Order\Models\CouponRedemption;

class CouponServiceExtended extends CouponService
{
    public function recordRedemption(Coupon $coupon, int $userId, int $orderId, int $amount): void
    {
        CouponRedemption::create([
            'coupon_id' => $coupon->id,
            'user_id' => $userId,
            'order_id' => $orderId,
            'amount_discounted' => $amount,
        ]);
    }
}

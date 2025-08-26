<?php

namespace App\Domain\Order\Services;

use App\Domain\Order\Models\Coupon;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class CouponRedemptionService
{
    public function canUse(Coupon $coupon, int $userId): bool
    {
        if ($coupon->usage_limit) {
            $totalUsed = DB::table('coupon_redemptions')->where('coupon_id', $coupon->id)->count();
            if ($totalUsed >= $coupon->usage_limit) return false;
        }

        if ($coupon->usage_limit_per_user) {
            $userUsed = DB::table('coupon_redemptions')
                ->where('coupon_id', $coupon->id)
                ->where('user_id', $userId)
                ->count();
            if ($userUsed >= $coupon->usage_limit_per_user) return false;
        }

        return true;
    }

    public function redeem(Coupon $coupon, int $userId, int $orderId, int $amountDiscounted): void
    {
        DB::table('coupon_redemptions')->insert([
            'coupon_id' => $coupon->id,
            'user_id' => $userId,
            'order_id' => $orderId,
            'amount_discounted' => max(0, $amountDiscounted),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

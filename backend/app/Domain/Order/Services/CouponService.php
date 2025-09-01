<?php

namespace App\Domain\Order\Services;

use App\Domain\Order\Models\Coupon;
use Illuminate\Support\Arr;

class CouponService
{
    public function apply(?Coupon $coupon, int $subtotal): array
    {
        if (!$coupon) return ['discount' => 0, 'applied' => false];

        $discount = 0;
        if ($coupon->type === Coupon::TYPE_PERCENT) {
            $discount = (int) floor($subtotal * ($coupon->value / 100));
        } else {
            $discount = (int) $coupon->value;
        }

        if ($coupon->max_discount) {
            $discount = min($discount, (int) $coupon->max_discount);
        }

        $discount = max(0, min($discount, $subtotal));

        return ['discount' => $discount, 'applied' => $discount > 0];
    }
}

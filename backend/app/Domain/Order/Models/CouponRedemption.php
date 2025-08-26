<?php

namespace App\Domain\Order\Models;

use Illuminate\Database\Eloquent\Model;

class CouponRedemption extends Model
{
    protected $table = 'coupon_redemptions';

    protected $fillable = [
        'coupon_id','user_id','order_id','amount_discounted'
    ];
}

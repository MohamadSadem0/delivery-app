<?php

namespace App\Domain\Order\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Coupon extends Model
{
    protected $table = 'coupons';

    protected $fillable = [
        'code', 'type', 'value', 'max_discount', 'min_subtotal',
        'starts_at', 'ends_at', 'usage_limit', 'usage_limit_per_user',
        'is_active', 'store_id', 'category_id'
    ];

    protected $casts = [
        'value' => 'integer',
        'max_discount' => 'integer',
        'min_subtotal' => 'integer',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'usage_limit' => 'integer',
        'usage_limit_per_user' => 'integer',
        'is_active' => 'boolean',
        'store_id' => 'integer',
        'category_id' => 'integer',
    ];

    public const TYPE_FIXED = 'fixed';
    public const TYPE_PERCENT = 'percent';

    public function isActiveNow(): bool
    {
        $now = Carbon::now();
        if (!$this->is_active) return false;
        if ($this->starts_at && $this->starts_at->isFuture()) return false;
        if ($this->ends_at && $this->ends_at->isPast()) return false;
        return true;
    }
}

<?php

namespace App\Domain\Order\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Domain\Order\Models\Coupon;

class ValidCoupon implements Rule
{
    protected ?Coupon $coupon = null;
    protected int $subtotal;

    public function __construct(int $subtotal)
    {
        $this->subtotal = $subtotal;
    }

    public function passes($attribute, $value): bool
    {
        if (!$value) return true;
        $this->coupon = Coupon::where('code', strtoupper(trim($value)))->first();
        if (!$this->coupon) return false;
        if (!$this->coupon->isActiveNow()) return false;
        if ($this->coupon->min_subtotal && $this->subtotal < $this->coupon->min_subtotal) return false;
        return true;
    }

    public function message(): string
    {
        return 'The provided coupon is invalid or not applicable.';
    }

    public function coupon(): ?Coupon
    {
        return $this->coupon;
    }
}

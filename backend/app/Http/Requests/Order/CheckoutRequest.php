<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;
use App\Domain\Cart\Models\Cart;
use App\Domain\Order\Rules\ValidCoupon;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $userId = $this->user('api')->id ?? null;
        $subtotal = 0;
        if ($userId) {
            $cart = Cart::where('user_id', $userId)->with('items.product')->first();
            if ($cart) {
                $subtotal = $cart->items->sum(function ($item) {
                    $unit = (int) ($item->product->sale_price ?? $item->product->price);
                    return $unit * (int) $item->qty;
                });
            }
        }

        return [
            'address_id' => ['nullable', 'integer'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'coupon_code' => ['nullable', 'string', new ValidCoupon($subtotal)],
        ];
    }
}

<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'shipping_address_id' => ['nullable','integer'],
            'fulfillment_type'    => ['required','in:DELIVERY,PICKUP,SHIPPING'],
            'preferred_delivery_user_id' => ['nullable','integer'],
        ];
    }
}

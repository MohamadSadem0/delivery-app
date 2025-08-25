<?php

namespace App\Http\Requests\Payment;

use Illuminate\Foundation\Http\FormRequest;

class PaymentIntentRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'order_id' => ['required','integer'],
            'provider' => ['required','in:COD,STRIPE'],
        ];
    }
}

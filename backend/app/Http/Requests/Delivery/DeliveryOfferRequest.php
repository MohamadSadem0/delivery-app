<?php

namespace App\Http\Requests\Delivery;

use Illuminate\Foundation\Http\FormRequest;

class DeliveryOfferRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'offer_price_cents' => ['required','integer','min:0'],
            'eta_minutes'       => ['nullable','integer','min:1'],
        ];
    }
}

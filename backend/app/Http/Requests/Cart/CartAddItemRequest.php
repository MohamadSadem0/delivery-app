<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;

class CartAddItemRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'product_id' => ['required','integer'],
            'variant_id' => ['nullable','integer'],
            'qty'        => ['required','integer','min:1'],
        ];
    }
}

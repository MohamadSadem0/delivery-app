<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class VariantUpsertRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'sku'            => ['required','string','max:191'],
            'name'           => ['nullable','string','max:191'],
            'price_cents'    => ['required','integer','min:0'],
            'stock_qty'      => ['nullable','integer','min:0'],
            'is_active'      => ['nullable','boolean'],
        ];
    }
}

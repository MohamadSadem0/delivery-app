<?php

namespace App\Http\Requests\Catalog;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => ['required','string','max:255'],
            'slug' => ['nullable','string','max:255','unique:products,slug'],
            'category_id' => ['required','integer','exists:categories,id'],
            'description' => ['nullable','string'],
            'price' => ['required','integer','min:0'],
            'sale_price' => ['nullable','integer','min:0'],
            'currency' => ['nullable','string','size:3'],
            'stock' => ['required','integer','min:0'],
            'is_active' => ['boolean'],
        ];
    }
}

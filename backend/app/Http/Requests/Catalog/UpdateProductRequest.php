<?php

namespace App\Http\Requests\Catalog;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $productId = $this->route('product')?->id ?? null;

        return [
            'name' => ['sometimes','string','max:255'],
            'slug' => [
                'sometimes','string','max:255',
                Rule::unique('products','slug')->ignore($productId)
            ],
            'category_id' => ['sometimes','integer','exists:categories,id'],
            'description' => ['sometimes','nullable','string'],
            'price' => ['sometimes','integer','min:0'],
            'sale_price' => ['sometimes','nullable','integer','min:0'],
            'currency' => ['sometimes','string','size:3'],
            'stock' => ['sometimes','integer','min:0'],
            'is_active' => ['sometimes','boolean'],
        ];
    }
}

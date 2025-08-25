<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpsertRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'        => ['required','string','max:191'],
            'slug'        => ['required','string','max:191'],
            'description' => ['nullable','string'],
            'is_active'   => ['nullable','boolean'],
            'section_id'  => ['nullable','integer'],
            'category_id' => ['nullable','integer'],
        ];
    }
}

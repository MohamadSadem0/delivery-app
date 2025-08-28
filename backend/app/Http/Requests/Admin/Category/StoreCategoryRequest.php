<?php

namespace App\Http\Requests\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $sectionId = (int) $this->input('section_id');

        return [
            'section_id' => ['required','integer','exists:sections,id'],
            'name'       => ['required','string','max:120'],
            'slug'       => [
                'nullable','string','max:120',
                Rule::unique('categories','slug')->where(fn($q) => $q->where('section_id', $sectionId)),
            ],
            'is_active'  => ['sometimes','boolean'],
        ];
    }
}

<?php

namespace App\Http\Requests\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $category   = $this->route('category');
        $sectionId  = (int) ($this->input('section_id') ?? $category?->section_id ?? 0);
        $ignoreId   = $category?->id;

        return [
            'section_id' => ['sometimes','integer','exists:sections,id'],
            'name'       => ['sometimes','string','max:120'],
            'slug'       => [
                'sometimes','string','max:120',
                Rule::unique('categories','slug')
                    ->ignore($ignoreId)
                    ->where(fn($q) => $q->where('section_id', $sectionId)),
            ],
            'is_active'  => ['sometimes','boolean'],
        ];
    }
}

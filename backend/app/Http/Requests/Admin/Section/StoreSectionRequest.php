<?php

namespace App\Http\Requests\Admin\Section;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSectionRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'      => ['required','string','max:100'],
            'slug'      => ['nullable','string','max:100', Rule::unique('sections','slug')],
            'is_active' => ['sometimes','boolean'],
        ];
    }
}

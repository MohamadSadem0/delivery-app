<?php

namespace App\Http\Requests\Admin\Section;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSectionRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $id = $this->route('section')?->id ?? $this->route('id');

        return [
            'name'      => ['sometimes','string','max:100'],
            'slug'      => ['sometimes','string','max:100', Rule::unique('sections','slug')->ignore($id)],
            'is_active' => ['sometimes','boolean'],
        ];
    }
}

<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class SectionUpsertRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'        => ['required','string','max:191'],
            'sort_order'  => ['nullable','integer','min:0'],
        ];
    }
}

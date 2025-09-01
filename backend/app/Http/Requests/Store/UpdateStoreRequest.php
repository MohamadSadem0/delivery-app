<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => ['sometimes','string','max:255'],
            'slug' => ['sometimes','string','max:255','unique:stores,slug,'.$this->user()->id.',user_id'],
            'description' => ['nullable','string','max:1000'],
            'is_active' => ['boolean'],
        ];
    }
}

<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => ['sometimes','string','max:255'],
            'phone' => ['sometimes','nullable','string','max:30'],
            'role' => ['sometimes','in:customer,vendor,admin'],
        ];
    }
}

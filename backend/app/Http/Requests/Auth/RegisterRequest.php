<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'     => ['required','string','max:191'],
            'email'    => ['required','email','unique:users,email'],
            'password' => ['required', Password::min(8)],
            'role'     => ['nullable','in:CUSTOMER,VENDOR,DELIVERY,ADMIN'],
        ];
    }
}

<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpsertRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'        => ['required','string','max:191'],
            'slug'        => ['required','string','max:191'],
            'type'        => ['required','string','max:64'],
            'description' => ['nullable','string'],
            'phone'       => ['nullable','string','max:40'],
            'email'       => ['nullable','email'],
            'logo_url'    => ['nullable','url'],
            'banner_url'  => ['nullable','url'],
            'allow_delivery' => ['nullable','boolean'],
            'allow_pickup'   => ['nullable','boolean'],
        ];
    }
}

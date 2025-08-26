<?php

namespace App\Http\Requests\Address;

use Illuminate\Foundation\Http\FormRequest;

class StoreAddressRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'label' => ['required','string','max:255'],
            'country' => ['required','string','max:100'],
            'city' => ['required','string','max:100'],
            'district' => ['nullable','string','max:100'],
            'street' => ['nullable','string','max:255'],
            'building' => ['nullable','string','max:255'],
            'floor' => ['nullable','string','max:50'],
            'details' => ['nullable','string','max:1000'],
            'lat' => ['nullable','numeric'],
            'lng' => ['nullable','numeric'],
            'phone' => ['nullable','string','max:30'],
            'is_default' => ['boolean'],
        ];
    }
}

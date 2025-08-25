<?php

namespace App\Http\Requests\Promo;

use Illuminate\Foundation\Http\FormRequest;

class PromotionApplyRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'code' => ['required','string','max:64'],
        ];
    }
}

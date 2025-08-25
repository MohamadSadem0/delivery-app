<?php

namespace App\Http\Requests\Review;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'store_id'   => ['nullable','integer'],
            'product_id' => ['nullable','integer'],
            'rating'     => ['required','integer','min:1','max:5'],
            'comment'    => ['nullable','string','max:2000'],
        ];
    }
}

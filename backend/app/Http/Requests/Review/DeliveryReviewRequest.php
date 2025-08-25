<?php

namespace App\Http\Requests\Review;

use Illuminate\Foundation\Http\FormRequest;

class DeliveryReviewRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'delivery_id' => ['required','integer'],
            'rating'      => ['required','integer','min:1','max:5'],
            'comment'     => ['nullable','string','max:2000'],
        ];
    }
}

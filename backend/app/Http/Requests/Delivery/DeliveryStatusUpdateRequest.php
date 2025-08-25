<?php

namespace App\Http\Requests\Delivery;

use Illuminate\Foundation\Http\FormRequest;

class DeliveryStatusUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'status' => ['required','in:PICKED_UP,DELIVERED,CANCELLED'],
        ];
    }
}

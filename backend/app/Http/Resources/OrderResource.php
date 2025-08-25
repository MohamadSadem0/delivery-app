<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'subtotal_cents' => (int) $this->subtotal_cents,
            'shipping_cents' => (int) $this->shipping_cents,
            'total_cents' => (int) $this->total_cents,
            'currency' => $this->currency,
            'created_at' => $this->created_at,
        ];
    }
}

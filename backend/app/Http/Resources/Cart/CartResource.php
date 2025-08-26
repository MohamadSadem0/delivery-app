<?php

namespace App\Http\Resources\Cart;

use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'currency' => $this->currency ?? 'LBP',
            'items' => CartItemResource::collection($this->whenLoaded('items')),
            'subtotal' => $this->subtotal(),
            'delivery_fee' => $this->deliveryFee(),
            'total' => $this->total(),
            'updated_at' => optional($this->updated_at)->toIso8601String(),
        ];
    }
}

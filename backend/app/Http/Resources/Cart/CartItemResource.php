<?php

namespace App\Http\Resources\Cart;

use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'product' => [
                'id' => $this->product->id,
                'name' => $this->product->name,
                'slug' => $this->product->slug,
            ],
            'store_id' => $this->store_id,
            'qty' => $this->qty,
            'unit_price' => $this->unit_price,
            'currency' => $this->currency ?? 'LBP',
            'line_total' => $this->lineTotal(),
        ];
    }
}

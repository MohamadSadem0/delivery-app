<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'cart_id' => $this->cart_id,
            'store_id' => $this->store_id,
            'product_id' => $this->product_id,
            'product_variant_id' => $this->product_variant_id,
            'qty' => (int) $this->qty,
            'unit_price_cents' => (int) $this->unit_price_cents,
            'total_price_cents' => (int) $this->total_price_cents,
        ];
    }
}

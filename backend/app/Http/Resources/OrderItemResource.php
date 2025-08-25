<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'order_store_id' => $this->order_store_id,
            'product_id' => $this->product_id,
            'product_variant_id' => $this->product_variant_id,
            'name' => $this->name,
            'qty' => (int) $this->qty,
            'unit_price_cents' => (int) $this->unit_price_cents,
            'total_price_cents' => (int) $this->total_price_cents,
        ];
    }
}

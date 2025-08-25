<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductVariantResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'sku' => $this->sku,
            'name' => $this->name,
            'price_cents' => (int) $this->price_cents,
            'stock_qty' => (int) $this->stock_qty,
            'is_active' => (bool) $this->is_active,
        ];
    }
}

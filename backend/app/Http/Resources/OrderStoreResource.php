<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderStoreResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'store_id' => $this->store_id,
            'fulfillment_type' => $this->fulfillment_type,
            'status' => $this->status,
            'items_subtotal_cents' => (int) $this->items_subtotal_cents,
            'delivery_fee_cents' => (int) $this->delivery_fee_cents,
            'total_cents' => (int) $this->total_cents,
            'preferred_delivery_user_id' => $this->preferred_delivery_user_id,
        ];
    }
}

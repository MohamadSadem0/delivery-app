<?php

namespace App\Http\Resources\Order;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Order\OrderItemResource;

class OrderResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'total' => $this->total,
            'currency' => $this->currency,
            'items' => OrderItemResource::collection($this->whenLoaded('items')),
            'created_at' => optional($this->created_at)->toIso8601String(),
        ];
    }
}

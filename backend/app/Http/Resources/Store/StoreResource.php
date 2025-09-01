<?php

namespace App\Http\Resources\Store;

use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'is_active' => (bool)$this->is_active,
            'owner_id' => $this->user_id,
            'created_at' => optional($this->created_at)->toIso8601String(),
        ];
    }
}

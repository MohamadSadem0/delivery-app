<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'type' => $this->type,
            'description' => $this->description,
            'phone' => $this->phone,
            'email' => $this->email,
            'logo_url' => $this->logo_url,
            'banner_url' => $this->banner_url,
        ];
    }
}

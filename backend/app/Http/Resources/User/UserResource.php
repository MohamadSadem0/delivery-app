<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role ?? 'customer',
            'country_code' => $this->country_code ?? 'LB',
            'email_verified' => (bool) $this->email_verified_at,
            'created_at' => optional($this->created_at)->toIso8601String(),
        ];
    }
}

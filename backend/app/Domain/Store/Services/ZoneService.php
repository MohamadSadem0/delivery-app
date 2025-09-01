<?php

namespace App\Domain\Store\Services;

use App\Domain\Store\Models\Zone;

class ZoneService
{
    public function getFee(string $city, ?string $district = null): int
    {
        // Simplified: look up by city/district
        $zone = Zone::where('name', $district ?? $city)->first();
        return $zone?->delivery_fee ?? 0;
    }
}

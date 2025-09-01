<?php

namespace App\Domain\Catalog\Services;

use Illuminate\Support\Facades\Cache;
use RuntimeException;

class InventoryReservationService
{
    public function reserve(int $productId, int $qty, int $ttl = 300): bool
    {
        $key = "reserve:product:$productId";
        $lock = Cache::lock($key, $ttl);

        if ($lock->get()) {
            return true;
        }
        return false;
    }

    public function release(int $productId): void
    {
        $key = "reserve:product:$productId";
        Cache::lock($key)->release();
    }
}

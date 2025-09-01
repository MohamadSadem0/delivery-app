<?php

namespace App\Domain\Order\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class InventoryReservationService
{
    protected function reservedKey(int $productId): string
    {
        return "inv:reserved:{$productId}";
    }

    protected function tokenListKey(string $token): string
    {
        return "inv:token:{$token}:list";
    }

    /**
     * Returns DB stock minus reserved (Redis) for a product.
     */
    public function availableStock(int $productId): int
    {
        $stock = (int) DB::table('products')->where('id', $productId)->value('stock');
        $reserved = (int) Cache::store('redis')->get($this->reservedKey($productId), 0);
        return max(0, $stock - $reserved);
    }

    /**
     * Try to reserve qty for a product under a reservation token (e.g., cart/order id).
     * Stores per-token reservations to allow releaseAll().
     */
    public function tryReserve(string $token, int $productId, int $qty, int $ttlSeconds = 900): bool
    {
        $lock = Cache::store('redis')->lock("inv:lock:{$productId}", 5);
        return $lock->block(5, function () use ($productId, $qty, $ttlSeconds, $token) {
            $reservedKey = $this->reservedKey($productId);
            $currentReserved = (int) Cache::store('redis')->get($reservedKey, 0);
            $stock = (int) DB::table('products')->where('id', $productId)->value('stock');

            if ($qty <= 0) return false;
            if ($currentReserved + $qty > $stock) {
                return false;
            }

            Cache::store('redis')->put($reservedKey, $currentReserved + $qty, $ttlSeconds);

            // Track this reservation under the token
            $listKey = $this->tokenListKey($token);
            $list = Cache::store('redis')->get($listKey, []);
            $list[] = ['product_id' => $productId, 'qty' => $qty];
            Cache::store('redis')->put($listKey, $list, $ttlSeconds);
            return true;
        });
    }

    /**
     * Release all reservations for a token (e.g., when payment fails).
     */
    public function releaseAll(string $token): void
    {
        $listKey = $this->tokenListKey($token);
        $list = Cache::store('redis')->get($listKey, []);

        foreach ($list as $entry) {
            $productId = (int) $entry['product_id'];
            $qty = (int) $entry['qty'];
            $lock = Cache::store('redis')->lock("inv:lock:{$productId}", 5);
            $lock->block(5, function () use ($productId, $qty) {
                $reservedKey = $this->reservedKey($productId);
                $current = (int) Cache::store('redis')->get($reservedKey, 0);
                $new = max(0, $current - $qty);
                Cache::store('redis')->put($reservedKey, $new, 600);
            });
        }

        Cache::store('redis')->forget($listKey);
    }
}

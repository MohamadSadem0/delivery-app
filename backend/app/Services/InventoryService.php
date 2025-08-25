<?php

namespace App\Services;

use App\Models\ProductVariant;

class InventoryService
{
    public function reserveVariant(ProductVariant $variant, int $qty): bool
    {
        if ($variant->stock_qty < $qty) return false;
        $variant->stock_qty -= $qty;
        $variant->save();
        return true;
    }
}

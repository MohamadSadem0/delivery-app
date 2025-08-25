<?php

namespace App\Services;

use App\Models\CartItem;

class PricingService
{
    public function summarizeCartItems($items): array
    {
        $subtotal = 0;
        foreach ($items as $it) {
            $subtotal += (int) $it->total_price_cents;
        }
        $shipping = 0; // TODO: compute by zone/distance
        $total = $subtotal + $shipping;

        return compact('subtotal','shipping','total');
    }
}

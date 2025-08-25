<?php

namespace App\Services;

class PromotionService
{
    public function validateAndApply(string $code, array $summary): array
    {
        // TODO: lookup code and rules. Here we apply a dummy 10% discount for code "SAVE10".
        $discount = 0;
        if (strtoupper($code) === 'SAVE10') {
            $discount = (int) round($summary['subtotal'] * 0.10);
        }
        $total = max(0, $summary['total'] - $discount);
        return ['discount_cents' => $discount, 'new_total_cents' => $total];
    }
}

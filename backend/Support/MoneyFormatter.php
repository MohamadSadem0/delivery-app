<?php

namespace App\Support;

final class MoneyFormatter
{
    public static function format(int $amount, string $currency = 'LBP'): string
    {
        if ($currency === 'USD') {
            return '$' . number_format($amount / 100, 2);
        }
        return number_format($amount) . ' ' . $currency; // default LBP (no decimals)
    }
}

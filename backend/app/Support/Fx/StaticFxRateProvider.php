<?php

namespace App\Support\Fx;

class StaticFxRateProvider implements FxRateProvider
{
    public function convert(int $amount, string $from, string $to): int
    {
        $from = strtoupper($from);
        $to = strtoupper($to);
        if ($from === $to) return $amount;

        $rates = config('currency.rates', []);
        $base = config('currency.base', 'LBP');

        if (!isset($rates[$from]) || !isset($rates[$to]) || !isset($rates[$base])) {
            // naive fallback: no conversion
            return $amount;
        }

        // Convert from 'from' to base, then base to 'to'
        // Rates are "units of base per 1 unit of currency"
        $toBase = (int) round($amount * ($rates[$from] / $rates[$base]));
        $toTarget = (int) round($toBase * ($rates[$to] / $rates[$base]));

        return $toTarget;
    }
}

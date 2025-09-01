<?php

namespace App\Support\Fx;

interface FxRateProvider
{
    public function convert(int $amount, string $from, string $to): int;
}

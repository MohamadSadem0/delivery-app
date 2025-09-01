<?php

namespace App\Support\Money;

use App\Support\Fx\FxRateProvider;
use App\Support\MoneYFormatter; // note: correct namespace App\Support\MoneyFormatter

class MoneyPresenter
{
    public function __construct(protected FxRateProvider $fx) {}

    public function present(int $amount, string $currency = 'LBP', ?string $targetCurrency = null): string
    {
        $target = $targetCurrency ?: $currency;
        if ($target !== $currency) {
            $amount = $this->fx->convert($amount, $currency, $target);
        }

        return \App\Support\MoneyFormatter::format($amount, $target);
    }
}

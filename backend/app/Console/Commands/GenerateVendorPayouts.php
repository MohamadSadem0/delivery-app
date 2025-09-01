<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use App\Domain\Store\Models\Store;
use App\Domain\Payout\Services\PayoutService;

class GenerateVendorPayouts extends Command
{
    protected $signature = 'payouts:generate {--from=} {--to=}';
    protected $description = 'Generate payouts for all stores for a given period';

    public function handle(PayoutService $service)
    {
        $from = $this->option('from') ? Carbon::parse($this->option('from')) : now()->startOfMonth()->subMonth();
        $to = $this->option('to') ? Carbon::parse($this->option('to')) : now()->startOfMonth()->subSecond();

        $stores = Store::query()->get(['id','name']);
        $this->info("Generating payouts from {$from} to {$to} for {$stores->count()} stores...");

        foreach ($stores as $store) {
            $calc = $service->calculateForStore($store->id, $from, $to);
            $min = (int) config('payouts.min_payout_amount', 0);
            if ($calc['net'] < $min) {
                $this->line(" - Store {$store->id}: below threshold (net {$calc['net']})");
                continue;
            }
            $p = $service->createPayout($store->id, $from, $to);
            $this->line(" - Store {$store->id}: payout #{$p->id} net={$p->net_amount}");
        }

        $this->info('Done.');
    }
}

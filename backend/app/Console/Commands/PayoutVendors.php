<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Domain\Finance\Models\VendorPayout;
use App\Domain\Finance\Services\VendorPayoutService;

class PayoutVendors extends Command
{
    protected $signature = 'finance:payout-vendors';
    protected $description = 'Process scheduled vendor payouts';

    public function handle(VendorPayoutService $service)
    {
        $this->info('Processing vendor payouts...');
        $count = 0;
        VendorPayout::where('status','scheduled')
            ->where('scheduled_at','<=', now())
            ->chunk(50, function ($payouts) use ($service, &$count) {
                foreach ($payouts as $payout) {
                    $service->process($payout, ['gateway'=>'manual']);
                    $this->info("Processed payout #{$payout->id}");
                    $count++;
                }
            });
        $this->info("Done. Total: $count");
    }
}

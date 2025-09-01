<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class SendWeeklyFinanceReport extends Command
{
    protected $signature = 'finance:weekly-report';
    protected $description = 'Send weekly finance summary to admins';

    public function handle()
    {
        $totalSales = (int) DB::table('orders')->where('status','delivered')->sum('total');
        $totalOrders = (int) DB::table('orders')->count();

        $body = "Weekly Finance Report:\nTotal Sales: {$totalSales}\nTotal Orders: {$totalOrders}";

        $emails = explode(',', config('finance.admin_emails',''));
        foreach ($emails as $email) {
            if (trim($email)) {
                Mail::raw($body, fn($m) => $m->to(trim($email))->subject('Weekly Finance Report'));
            }
        }

        $this->info('Weekly report sent to admins.');
    }
}

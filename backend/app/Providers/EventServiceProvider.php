<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Auth\Events\Failed;
use App\Listeners\LogFailedLogin;
use App\Events\OrderStatusUpdated;
use App\Listeners\NotifyUserOrderStatusChanged;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Failed::class => [
            LogFailedLogin::class,
        ],
        OrderStatusUpdated::class => [
            NotifyUserOrderStatusChanged::class,
        ],
    ];

    public function boot(): void
    {
        //
    }
}

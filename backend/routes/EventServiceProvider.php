<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Event;
use Illuminate\Queue\Events\JobFailed;
use App\Listeners\LogFailedLogin;
use App\Listeners\JobFailedListener;
use App\Events\OrderStatusUpdated;
use App\Listeners\NotifyUserOrderStatusChanged;
use App\Domain\User\Models\UserActivity;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Failed::class => [
            LogFailedLogin::class,
        ],
        JobFailed::class => [
            JobFailedListener::class,
        ],
        OrderStatusUpdated::class => [
            NotifyUserOrderStatusChanged::class,
        ],
    ];

    public function boot(): void
    {
        // Record login/logout
        Event::listen(Login::class, function (Login $event) {
            UserActivity::create([
                'user_id' => $event->user->id,
                'event' => 'login',
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);
        });

        Event::listen(Logout::class, function (Logout $event) {
            if ($event->user) {
                UserActivity::create([
                    'user_id' => $event->user->id,
                    'event' => 'logout',
                    'ip' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                ]);
            }
        });
    }
}

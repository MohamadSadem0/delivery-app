<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Logout;
use App\Domain\User\Models\UserActivity;

class LogUserLogout
{
    public function handle(Logout $event): void
    {
        UserActivity::create([
            'user_id'=>$event->user->id,
            'type'=>'logout',
            'ip'=>request()->ip(),
            'user_agent'=>request()->userAgent(),
        ]);
    }
}

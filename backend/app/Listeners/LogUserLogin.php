<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use App\Domain\User\Models\UserActivity;

class LogUserLogin
{
    public function handle(Login $event): void
    {
        UserActivity::create([
            'user_id'=>$event->user->id,
            'type'=>'login',
            'ip'=>request()->ip(),
            'user_agent'=>request()->userAgent(),
        ]);
    }
}

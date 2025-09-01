<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Failed;
use App\Domain\Security\Models\SUSPiciousActivity;
use App\Domain\Security\Services\SuspiciousActivityService;

class LogFailedLogin
{
    public function __construct(protected SuspiciousActivityService $service) {}

    public function handle(Failed $event): void
    {
        $userId = $event->user?->id;
        $this->service->log($userId, 'login_failed', [
            'email' => request('email'),
        ]);
    }
}

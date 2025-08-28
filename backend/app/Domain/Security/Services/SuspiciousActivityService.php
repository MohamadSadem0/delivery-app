<?php

namespace App\Domain\Security\Services;

use App\Domain\Security\Models\SuspiciousActivity;

class SuspiciousActivityService
{
    public function log(?int $userId, string $type, array $meta = []): void
    {
        SuspiciousActivity::create([
            'user_id' => $userId,
            'type' => $type,
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'meta' => $meta ?: null,
        ]);
    }
}

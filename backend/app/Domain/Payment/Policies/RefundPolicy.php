<?php

namespace App\Domain\Payment\Policies;

use App\Domain\User\Models\User;
use App\Domain\Payment\Models\Refund;

class RefundPolicy
{
    public function view(User $user, Refund $refund): bool
    {
        return $user->id === $refund->order->user_id || $user->role === 'admin';
    }

    public function manage(User $user, Refund $refund): bool
    {
        return $user->role === 'admin';
    }
}

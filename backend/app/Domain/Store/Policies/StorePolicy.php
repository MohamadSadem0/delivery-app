<?php

namespace App\Domain\Store\Policies;

use App\Domain\User\Models\User;
use App\Domain\Store\Models\Store;

class StorePolicy
{
    public function update(User $user, Store $store): bool
    {
        return $user->role === 'admin' || $store->user_id === $user->id;
    }

    public function delete(User $user, Store $store): bool
    {
        return $user->role === 'admin';
    }
}

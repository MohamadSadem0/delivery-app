<?php

namespace App\Policies;

use App\Domain\User\Models\User;

class OwnsResourcePolicy
{
    public function own(User $user, $model): bool
    {
        return isset($model->user_id) && (int)$model->user_id === (int)$user->id;
    }
}

<?php

namespace App\Domain\Catalog\Policies;

use App\Domain\User\Models\User;
use App\Domain\Catalog\Models\Product;

class ProductPolicy
{
    public function update(User $user, Product $product): bool
    {
        return $user->role === 'admin' || $user->id === $product->store->user_id;
    }

    public function delete(User $user, Product $product): bool
    {
        return $user->role === 'admin';
    }
}

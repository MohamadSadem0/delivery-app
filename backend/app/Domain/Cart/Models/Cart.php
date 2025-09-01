<?php

namespace App\Domain\Cart\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\User\Models\User;

class Cart extends Model
{
    protected $table = 'carts';

    protected $fillable = ['user_id', 'currency'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function subtotal(): int
    {
        return $this->items->sum(fn($i) => $i->lineTotal());
    }

    public function deliveryFee(): int
    {
        // Placeholder: in Lebanon you may compute based on zone or distance
        return 0;
    }

    public function total(): int
    {
        return $this->subtotal() + $this->deliveryFee();
    }
}

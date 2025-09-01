<?php

namespace App\Domain\Cart\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\Catalog\Models\Product;

class CartItem extends Model
{
    protected $table = 'cart_items';

    protected $fillable = [
        'cart_id', 'product_id', 'store_id', 'qty', 'unit_price', 'currency'
    ];

    protected $casts = [
        'qty' => 'integer',
        'unit_price' => 'integer',
    ];

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function lineTotal(): int
    {
        return (int) $this->qty * (int) $this->unit_price;
    }
}

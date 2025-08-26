<?php

namespace App\Domain\Review\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\User\Models\User;
use App\Domain\Catalog\Models\Product;

class Review extends Model
{
    protected $table = 'reviews';

    protected $fillable = [
        'user_id', 'product_id', 'store_id', 'rating', 'comment'
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}

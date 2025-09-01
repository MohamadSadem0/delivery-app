<?php

namespace App\Domain\Store\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreAddress extends Model
{
    protected $table = 'store_addresses';

    protected $fillable = [
        'store_id','country','city','district','street','building','floor','lat','lng','phone'
    ];

    protected $casts = [
        'lat' => 'float',
        'lng' => 'float',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}

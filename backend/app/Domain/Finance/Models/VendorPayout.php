<?php

namespace App\Domain\Finance\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\Store\Models\Store;

class VendorPayout extends Model
{
    protected $table = 'vendor_payouts';

    protected $fillable = ['store_id','amount','currency','status','scheduled_at','processed_at','meta'];

    protected $casts = [
        'amount' => 'integer',
        'scheduled_at' => 'datetime',
        'processed_at' => 'datetime',
        'meta' => 'array',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}

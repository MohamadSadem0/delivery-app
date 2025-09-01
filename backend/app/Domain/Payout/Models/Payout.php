<?php

namespace App\Domain\Payout\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\Store\Models\Store;

class Payout extends Model
{
    protected $table = 'payouts';

    protected $fillable = [
        'store_id','period_start','period_end','gross_amount','commission_amount','net_amount',
        'currency','status','meta'
    ];

    protected $casts = [
        'period_start' => 'datetime',
        'period_end' => 'datetime',
        'gross_amount' => 'integer',
        'commission_amount' => 'integer',
        'net_amount' => 'integer',
        'meta' => 'array',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}

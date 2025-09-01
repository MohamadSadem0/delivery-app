<?php

namespace App\Domain\Payment\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\Order\Models\Order;
use App\Domain\Payment\Models\Payment;

class Refund extends Model
{
    protected $table = 'refunds';

    protected $fillable = [
        'order_id','payment_id','amount','currency','status','reason','meta'
    ];

    protected $casts = [
        'amount' => 'integer',
        'meta' => 'array',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }
}

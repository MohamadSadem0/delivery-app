<?php

namespace App\Domain\Payment\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\Order\Models\Order;

class Payment extends Model
{
    protected $table = 'payments';

    protected $fillable = [
        'order_id', 'provider', 'provider_payment_id', 'amount', 'currency', 'status', 'payload'
    ];

    protected $casts = [
        'amount' => 'integer',
        'payload' => 'array',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}

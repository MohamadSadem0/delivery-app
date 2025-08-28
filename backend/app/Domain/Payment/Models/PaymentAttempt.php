<?php

namespace App\Domain\Payment\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentAttempt extends Model
{
    protected $table = 'payment_attempts';

    protected $fillable = [
        'order_id', 'attempt_no', 'idempotency_key', 'status', 'meta',
    ];

    protected $casts = [
        'attempt_no' => 'int',
        'meta'       => 'array',
    ];
}

<?php

namespace App\Domain\Payment\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentAttempt extends Model
{
    protected $table = 'payment_attempts';

    protected $fillable = [
        'order_id','idempotency_key','attempt_no','status','meta'
    ];

    protected $casts = [
        'attempt_no' => 'integer',
        'meta' => 'array',
    ];
}

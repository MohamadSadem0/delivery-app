<?php

namespace App\Domain\Order\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\Order\Models\Order;

class OrderTimeline extends Model
{
    protected $table = 'order_timelines';

    protected $fillable = ['order_id','event','data'];

    protected $casts = [
        'data' => 'array',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}

<?php

namespace App\Domain\Delivery\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\Order\Models\Order;

class Delivery extends Model
{
    protected $table = 'deliveries';

    const STATUS_PENDING   = 'pending';
    const STATUS_DISPATCHED= 'dispatched';
    const STATUS_IN_TRANSIT= 'in_transit';
    const STATUS_DELIVERED = 'delivered';
    const STATUS_FAILED    = 'failed';

    protected $fillable = [
        'order_id', 'courier', 'tracking_number', 'status', 'eta_at', 'meta'
    ];

    protected $casts = [
        'eta_at' => 'datetime',
        'meta' => 'array',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}

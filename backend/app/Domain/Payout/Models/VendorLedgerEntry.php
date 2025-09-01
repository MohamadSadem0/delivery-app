<?php

namespace App\Domain\Payout\Models;

use Illuminate\Database\Eloquent\Model;

class VendorLedgerEntry extends Model
{
    protected $table = 'vendor_ledger_entries';

    protected $fillable = [
        'store_id','order_id','refund_id','context','type','amount','currency','meta',
    ];

    protected $casts = [
        'amount' => 'int',
        'meta'   => 'array',
    ];
}

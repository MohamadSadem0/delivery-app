<?php

namespace App\Domain\Payout\Models;

use Illuminate\Database\Eloquent\Model;
use App\Domain\Store\Models\Store;

class VendorBalance extends Model
{
    protected $table = 'vendor_balances';

    protected $fillable = ['store_id','balance','currency'];

    protected $casts = [
        'balance' => 'integer',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}

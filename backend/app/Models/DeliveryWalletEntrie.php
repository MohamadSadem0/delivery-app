<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryWalletEntrie extends Model
{
    protected $table = 'delivery_wallet_entries';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

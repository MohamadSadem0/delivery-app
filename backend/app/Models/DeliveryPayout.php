<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryPayout extends Model
{
    protected $table = 'delivery_payouts';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

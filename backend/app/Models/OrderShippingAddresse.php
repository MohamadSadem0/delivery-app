<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderShippingAddresse extends Model
{
    protected $table = 'order_shipping_addresses';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

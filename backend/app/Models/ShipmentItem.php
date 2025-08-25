<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShipmentItem extends Model
{
    protected $table = 'shipment_items';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

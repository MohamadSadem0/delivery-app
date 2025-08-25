<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryOffer extends Model
{
    protected $table = 'delivery_offers';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

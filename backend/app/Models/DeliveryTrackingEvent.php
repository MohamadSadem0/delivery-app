<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryTrackingEvent extends Model
{
    protected $table = 'delivery_tracking_events';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

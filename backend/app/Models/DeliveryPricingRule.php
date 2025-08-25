<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryPricingRule extends Model
{
    protected $table = 'delivery_pricing_rules';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

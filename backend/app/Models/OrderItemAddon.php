<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItemAddon extends Model
{
    protected $table = 'order_item_addons';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderStore extends Model
{
    protected $table = 'order_stores';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

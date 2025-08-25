<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreHour extends Model
{
    protected $table = 'store_hours';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

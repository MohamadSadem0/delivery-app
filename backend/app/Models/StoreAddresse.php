<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreAddresse extends Model
{
    protected $table = 'store_addresses';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

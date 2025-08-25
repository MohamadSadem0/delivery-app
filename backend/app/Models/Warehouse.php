<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $table = 'warehouses';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

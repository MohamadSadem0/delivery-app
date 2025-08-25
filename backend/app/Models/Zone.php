<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    protected $table = 'zones';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

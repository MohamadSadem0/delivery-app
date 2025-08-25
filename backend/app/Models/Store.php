<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $table = 'stores';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

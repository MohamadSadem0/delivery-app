<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductOption extends Model
{
    protected $table = 'product_options';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductOptionValue extends Model
{
    protected $table = 'product_option_values';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

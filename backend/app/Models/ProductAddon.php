<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductAddon extends Model
{
    protected $table = 'product_addons';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

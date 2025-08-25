<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductAddonGroup extends Model
{
    protected $table = 'product_addon_groups';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

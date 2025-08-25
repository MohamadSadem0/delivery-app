<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductMedia extends Model
{
    protected $table = 'product_media';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategorie extends Model
{
    protected $table = 'product_categories';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

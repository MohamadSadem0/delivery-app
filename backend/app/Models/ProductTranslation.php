<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductTranslation extends Model
{
    protected $table = 'product_translations';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

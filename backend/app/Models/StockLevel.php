<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockLevel extends Model
{
    protected $table = 'stock_levels';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

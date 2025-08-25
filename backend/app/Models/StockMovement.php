<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    protected $table = 'stock_movements';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

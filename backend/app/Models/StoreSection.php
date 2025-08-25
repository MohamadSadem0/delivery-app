<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreSection extends Model
{
    protected $table = 'store_sections';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

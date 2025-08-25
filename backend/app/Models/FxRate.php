<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FxRate extends Model
{
    protected $table = 'fx_rates';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

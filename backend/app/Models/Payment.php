<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payments';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

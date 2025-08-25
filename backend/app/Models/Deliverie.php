<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deliverie extends Model
{
    protected $table = 'deliveries';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreMember extends Model
{
    protected $table = 'store_members';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

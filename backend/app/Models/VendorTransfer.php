<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VendorTransfer extends Model
{
    protected $table = 'vendor_transfers';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

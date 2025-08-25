<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VendorLedgerEntrie extends Model
{
    protected $table = 'vendor_ledger_entries';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

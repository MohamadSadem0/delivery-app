<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    protected $table = 'promo_codes';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

<?php

namespace App\Domain\Store\Models;

use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    protected $table = 'zones';

    protected $fillable = [
        'name','delivery_fee'
    ];

    protected $casts = [
        'delivery_fee' => 'integer',
    ];
}

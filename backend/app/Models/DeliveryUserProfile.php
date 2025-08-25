<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryUserProfile extends Model
{
    protected $table = 'delivery_user_profiles';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

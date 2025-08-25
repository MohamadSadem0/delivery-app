<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $table = 'categories';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

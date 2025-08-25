<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SectionTranslation extends Model
{
    protected $table = 'section_translations';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

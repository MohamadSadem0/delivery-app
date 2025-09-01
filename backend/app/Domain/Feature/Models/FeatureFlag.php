<?php

namespace App\Domain\Feature\Models;

use Illuminate\Database\Eloquent\Model;

class FeatureFlag extends Model
{
    protected $table = 'feature_flags';

    protected $fillable = [
        'key','value','scope_type','scope_id','is_active','starts_at','ends_at','meta'
    ];

    protected $casts = [
        'value' => 'boolean',
        'is_active' => 'boolean',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'meta' => 'array',
    ];
}

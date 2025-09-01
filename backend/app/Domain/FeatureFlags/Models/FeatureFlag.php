<?php

namespace App\Domain\FeatureFlags\Models;

use Illuminate\Database\Eloquent\Model;

class FeatureFlag extends Model
{
    protected $table = 'feature_flags';

    protected $fillable = ['key','value','scope_type','scope_id'];

    protected $casts = [
        'value'=>'boolean',
    ];
}

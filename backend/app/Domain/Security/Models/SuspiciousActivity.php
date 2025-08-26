<?php

namespace App\Domain\Security\Models;

use Illuminate\Database\Eloquent\Model;

class SuspiciousActivity extends Model
{
    protected $table = 'suspicious_activities';

    protected $fillable = [
        'user_id','type','ip','user_agent','meta'
    ];

    protected $casts = [
        'meta' => 'array',
    ];
}

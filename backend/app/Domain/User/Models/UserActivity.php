<?php

namespace App\Domain\User\Models;

use Illuminate\Database\Eloquent\Model;

class UserActivity extends Model
{
    protected $table = 'user_activities';

    protected $fillable = ['user_id','event','ip','user_agent'];
}

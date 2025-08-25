<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MessageAttachment extends Model
{
    protected $table = 'message_attachments';
    protected $guarded = [];

    public $timestamps = false; // Many tables have only created_at
}

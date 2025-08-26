<?php

namespace App\Domain\Chat\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\User\Models\User;

class ChatThread extends Model
{
    protected $table = 'chat_threads';

    protected $fillable = [
        'user_id', 'store_id', 'subject'
    ];

    public function messages(): HasMany
    {
        return $this->hasMany(ChatMessage::class, 'thread_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

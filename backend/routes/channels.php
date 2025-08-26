<?php

use Illuminate\Support\Facades\Broadcast;
use App\Domain\Chat\Models\ChatThread;

Broadcast::channel('threads.{threadId}', function ($user, int $threadId) {
    return ChatThread::where('id', $threadId)->where('user_id', $user->id)->exists();
});

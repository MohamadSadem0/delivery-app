<?php

use App\Domain\User\Models\User;
use App\Domain\Chat\Models\ChatThread;
use App\Domain\Chat\Models\ChatMessage;
use App\Events\ChatMessageCreated;

it('broadcasts a chat message created event', function () {
    $user = User::factory()->create();
    $thread = ChatThread::factory()->create(['user_id' => $user->id]);
    $message = ChatMessage::factory()->create(['thread_id' => $thread->id,'sender_id'=>$user->id]);

    $event = new ChatMessageCreated($message);
    $payload = $event->broadcastWith();

    expect($payload['thread_id'])->toBe($thread->id);
    expect($payload['body'])->toBe($message->body);
});

<?php

use App\Domain\User\Models\User;
use App\Domain\Chat\Models\ChatThread;
use App\Domain\Chat\Models\ChatMessage;
use App\Events\ChatMessageCreated;
use Illuminate\Support\Facades\Event;

it('dispatches ChatMessageCreated when a message is sent', function () {
    Event::fake([ChatMessageCreated::class]);

    $user = User::factory()->create();
    $thread = ChatThread::create(['user_id' => $user->id, 'store_id' => 1, 'subject' => 'Help']);
    $message = ChatMessage::create(['thread_id' => $thread->id, 'sender_id' => $user->id, 'body' => 'Hello']);

    event(new ChatMessageCreated($message));

    Event::assertDispatched(ChatMessageCreated::class);
});

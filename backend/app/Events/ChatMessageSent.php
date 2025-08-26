<?php

namespace App\Events;

use App\Domain\Chat\Models\ChatMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

class ChatMessageSent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public function __construct(public ChatMessage $message) {}

    public function broadcastOn(): Channel
    {
        return new Channel('chat.thread.'.$this->message->thread_id);
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'thread_id' => $this->message->thread_id,
            'sender_id' => $this->message->sender_id,
            'body' => $this->message->body,
            'created_at' => optional($this->message->created_at)->toIso8601String(),
        ];
    }
}

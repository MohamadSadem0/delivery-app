<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Domain\Chat\Models\ChatMessage;

class ChatMessageCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public ChatMessage $message) {}

    public function broadcastOn(): Channel
    {
        return new PrivateChannel('threads.'.$this->message->thread_id);
    }

    public function broadcastAs(): string
    {
        return 'ChatMessageCreated';
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

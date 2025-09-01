<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Domain\Chat\Models\ChatMessage;
use Illuminate\Support\Facades\Log;

class SendChatPushNotification implements ShouldQueue
{
    use Dispatchable, Queueable;

    public function __construct(public int $messageId) {}

    public function handle(): void
    {
        $message = ChatMessage::find($this->messageId);
        if (!$message) return;

        // Integrate with FCM/OneSignal here
        Log::info('Push notification sent for chat message '.$message->id);
    }
}

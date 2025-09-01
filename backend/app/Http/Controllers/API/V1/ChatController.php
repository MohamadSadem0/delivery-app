<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Chat\Models\ChatThread;
use App\Domain\Chat\Models\ChatMessage;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function threads(Request $request)
    {
        $userId = auth('api')->id();
        $threads = ChatThread::query()
            ->where('user_id', $userId)
            ->latest('id')
            ->paginate(20);

        return response()->json($threads);
    }

    public function messages(ChatThread $thread)
    {
        $this->authorizeThread($thread);
        $messages = $thread->messages()->with('sender:id,name')->orderBy('id')->paginate(50);
        return response()->json($messages);
    }

    public function send(Request $request, ChatThread $thread)
    {
        $this->authorizeThread($thread);

        $data = $request->validate([
            'body' => ['required', 'string', 'max:2000']
        ]);

        $message = ChatMessage::create([
            'thread_id' => $thread->id,
            'sender_id' => auth('api')->id(),
            'body' => $data['body'],
        ]);

        return response()->json(['message' => 'Sent', 'data' => $message], 201);
    }

    protected function authorizeThread(ChatThread $thread): void
    {
        if ($thread->user_id !== auth('api')->id()) {
            abort(404);
        }
    }
}

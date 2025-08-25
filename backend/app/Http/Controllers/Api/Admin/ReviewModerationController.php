<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;

class ReviewModerationController extends Controller
{
    public function listPending()
    {
        return Review::where('status','PENDING')->orderBy('id')->paginate(50);
    }

    public function updateStatus(int $id)
    {
        $rev = Review::findOrFail($id);
        $status = request('status');
        if (!in_array($status, ['APPROVED','REJECTED'])) {
            return response()->json(['message'=>'Invalid status'], 422);
        }
        $rev->status = $status;
        $rev->save();
        return response()->json($rev);
    }
}

<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domain\User\Models\UserActivity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $q = UserActivity::query()->orderByDesc('id');
        if ($uid = $request->integer('user_id')) $q->where('user_id',$uid);
        if ($event = $request->string('event')->toString()) $q->where('event',$event);
        if ($from = $request->date('from')) $q->where('created_at','>=',$from);
        if ($to = $request->date('to')) $q->where('created_at','<=',$to);
        return response()->json($q->paginate(50));
    }
}

<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Security\Models\SuspiciousActivity;
use Illuminate\Http\Request;

class JobFailureController extends Controller
{
    public function index(Request $request)
    {
        $q = SuspiciousActivity::query()->where('type','job_failed')->orderByDesc('id');
        if ($job = $request->string('job')->toString()) {
            $q->where('meta->job',$job);
        }
        if ($queue = $request->string('queue')->toString()) {
            $q->where('meta->queue',$queue);
        }
        return response()->json($q->paginate(50));
    }
}

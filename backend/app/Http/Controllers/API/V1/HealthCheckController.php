<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class HealthCheckController extends Controller
{
    public function __invoke()
    {
        try {
            DB::connection()->getPdo();
            Cache::put('health_ping', 'ok', 5);
            $cacheOk = Cache::get('health_ping') === 'ok';
            return response()->json(['status' => 'ok', 'db' => true, 'cache' => $cacheOk], 200);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error', 'error' => $e->getMessage()], 500);
        }
    }
}

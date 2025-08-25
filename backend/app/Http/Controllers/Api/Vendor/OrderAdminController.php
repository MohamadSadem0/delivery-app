<?php

namespace App\Http\Controllers\Api\Vendor;

use App\Http\Controllers\Controller;
use App\Models\OrderStore;

class OrderAdminController extends Controller
{
    public function list(int $storeId)
    {
        $userId = auth('api')->id();
        $rows = OrderStore::where('store_id',$storeId)
            ->whereHas('store', fn($q)=>$q->where('owner_user_id',$userId))
            ->orderByDesc('id')->paginate(20);
        return $rows;
    }

    public function updateStatus(int $storeId, int $orderStoreId)
    {
        $os = OrderStore::where('id',$orderStoreId)->where('store_id',$storeId)
            ->whereHas('store', fn($q)=>$q->where('owner_user_id',auth('api')->id()))
            ->firstOrFail();

        $status = request('status');
        if (!in_array($status, ['CONFIRMED','REJECTED','READY','COMPLETED'])) {
            return response()->json(['message'=>'Invalid status'], 422);
        }
        $os->status = $status;
        $os->save();
        return response()->json($os);
    }
}

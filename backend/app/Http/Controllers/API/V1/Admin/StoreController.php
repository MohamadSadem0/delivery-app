<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Store\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index(Request $request)
    {
        $stores = Store::query()->paginate(20);
        return response()->json($stores);
    }

    public function approve(Store $store)
    {
        $store->is_active = true;
        $store->save();
        return response()->json(['message'=>'Store approved','store'=>$store]);
    }

    public function suspend(Store $store)
    {
        $store->is_active = false;
        $store->save();
        return response()->json(['message'=>'Store suspended','store'=>$store]);
    }
}

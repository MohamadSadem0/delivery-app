<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Store\Models\Store;
use Illuminate\Http\Request;

class StoreAdminController extends Controller
{
    public function index(Request $request)
    {
        $stores = Store::query()->orderBy('name')->paginate(20);
        return response()->json($stores);
    }

    public function toggle(Store $store)
    {
        $store->is_active = !$store->is_active;
        $store->save();

        return response()->json(['message' => 'Store status toggled', 'is_active' => $store->is_active]);
    }
}

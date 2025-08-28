<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Store\Models\Store;
use Illuminate\Http\Request;

class StoreAdminController extends Controller
{
public function index(Request $request)
{
    $q = \App\Domain\Store\Models\Store::query()->with(['section','owner']);

    if ($request->filled('section_id')) {
        $q->where('section_id', (int)$request->integer('section_id'));
    }
    foreach (['supports_delivery','supports_pickup','supports_shipping','is_active'] as $flag) {
        if (!is_null($request->input($flag))) {
            $q->where($flag, filter_var($request->input($flag), FILTER_VALIDATE_BOOLEAN));
        }
    }

    if ($request->filled('q')) {
        $k = '%'.$request->string('q')->toString().'%';
        $q->where(function($w) use ($k){
            $w->where('name','like',$k)->orWhere('slug','like',$k);
        });
    }

    return response()->json($q->orderByDesc('id')->paginate(20));
}


    public function toggle(Store $store)
    {
        $store->is_active = !$store->is_active;
        $store->save();

        return response()->json(['message' => 'Store status toggled', 'is_active' => $store->is_active]);
    }
}

<?php

namespace App\Http\Controllers\Api\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\StoreUpsertRequest;
use App\Http\Requests\Store\SectionUpsertRequest;
use App\Models\Store;
use App\Models\Section;
use Illuminate\Http\Request;

class StoreAdminController extends Controller
{
    public function myStores(Request $request)
    {
        $user = auth('api')->user();
        return Store::where('owner_user_id', $user->id)->orderBy('id','desc')->get();
    }

    public function create(StoreUpsertRequest $request)
    {
        $user = auth('api')->user();
        $data = $request->validated();
        $data['owner_user_id'] = $user->id;
        $store = Store::create($data);
        return response()->json($store, 201);
    }

    public function update(int $storeId, StoreUpsertRequest $request)
    {
        $user = auth('api')->user();
        $store = Store::where('id',$storeId)->where('owner_user_id',$user->id)->firstOrFail();
        $store->update($request->validated());
        return response()->json($store);
    }

    public function upsertSection(int $storeId, SectionUpsertRequest $request)
    {
        $user = auth('api')->user();
        $store = Store::where('id',$storeId)->where('owner_user_id',$user->id)->firstOrFail();
        $data = $request->validated();
        $sec = Section::updateOrCreate(
            ['store_id'=>$store->id,'name'=>$data['name']],
            ['sort_order'=>$data['sort_order'] ?? 0]
        );
        return response()->json($sec, 201);
    }

    public function sections(int $storeId)
    {
        $user = auth('api')->user();
        $store = Store::where('id',$storeId)->where('owner_user_id',$user->id)->firstOrFail();
        return Section::where('store_id',$store->id)->orderBy('sort_order')->get();
    }
}

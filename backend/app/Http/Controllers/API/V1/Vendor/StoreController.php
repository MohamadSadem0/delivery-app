<?php

namespace App\Http\Controllers\API\V1\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\UpdateStoreRequest;
use App\Http\Resources\Store\StoreResource;
use App\Domain\Store\Models\Store;

class StoreController extends Controller
{
    public function show()
    {
        $store = Store::where('user_id', auth('api')->id())->firstOrFail();
        return new StoreResource($store);
    }

    public function update(UpdateStoreRequest $request)
    {
        $store = Store::where('user_id', auth('api')->id())->firstOrFail();
        $store->update($request->validated());
        return new StoreResource($store);
    }
}

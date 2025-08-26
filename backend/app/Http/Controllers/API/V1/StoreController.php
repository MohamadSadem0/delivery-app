<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Store\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
   public function index(Request $request)
    {
        $stores = Store::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->paginate(20);

        return StoreResource::collection($stores);
    }


    public function show(Store $store)
    {
        abort_unless($store->is_active, 404);
        return new StoreResource($store);
    }

    public function update(Request $request, Store $store)
    {
        $this->authorize('update', $store);
        $data = $request->validate([
            'name' => ['sometimes','string','max:255'],
            'description' => ['nullable','string'],
            'is_active' => ['boolean'],
        ]);
        $store->update($data);
        return response()->json($store);
    }
}

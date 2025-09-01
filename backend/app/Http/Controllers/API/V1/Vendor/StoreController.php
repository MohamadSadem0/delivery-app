<?php

namespace App\Http\Controllers\API\V1\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Resources\Store\StoreResource;
use App\Domain\Store\Models\Store;
use App\Domain\Catalog\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class StoreController extends Controller
{
    public function show()
    {
        $store = Store::where('user_id', auth('api')->id())->with('section')->firstOrFail();
        return new StoreResource($store);
    }

    public function update(Request $request)
    {
        /** @var Store $store */
        $store = Store::where('user_id', auth('api')->id())->firstOrFail();

        // Validate with new fields (overrides any older FormRequest gaps)
        $validated = $request->validate([
            'name'                => ['sometimes','string','max:255'],
            'slug'                => [
                'sometimes','string','max:255',
                Rule::unique('stores','slug')
                    ->where(fn($q) => $q->where('user_id', $store->user_id))
                    ->ignore($store->id),
            ],
            'description'         => ['nullable','string'],
            'section_id'          => ['required','exists:sections,id'],
            'supports_delivery'   => ['sometimes','boolean'],
            'supports_pickup'     => ['sometimes','boolean'],
            'supports_shipping'   => ['sometimes','boolean'],
            'commission_rate_bps' => ['sometimes','integer','between:0,10000'],
            'is_active'           => ['sometimes','boolean'],
        ]);

        // Prevent changing section if products already exist under the old section
        if (isset($validated['section_id']) && (int)$validated['section_id'] !== (int)$store->section_id) {
            $hasProducts = Product::where('store_id', $store->id)->exists();
            if ($hasProducts) {
                return response()->json([
                    'message' => 'Cannot change section while the store has products. Remove or migrate products first.'
                ], 422);
            }
        }

        $store->fill($validated)->save();

        return new StoreResource($store->fresh('section'));
    }
}

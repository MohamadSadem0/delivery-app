<?php

namespace App\Http\Controllers\Api\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductUpsertRequest;
use App\Http\Requests\Product\VariantUpsertRequest;
use App\Models\Store;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductAdminController extends Controller
{
    private function assertStoreOwner(int $storeId): Store
    {
        $user = auth('api')->user();
        return Store::where('id',$storeId)->where('owner_user_id',$user->id)->firstOrFail();
    }

    public function upsert(int $storeId, ProductUpsertRequest $request)
    {
        $store = $this->assertStoreOwner($storeId);
        $data = $request->validated();
        $data['store_id'] = $store->id;

        $prod = Product::updateOrCreate(
            ['store_id'=>$store->id,'slug'=>$data['slug']],
            [
                'name'=>$data['name'],
                'description'=>$data['description'] ?? null,
                'is_active'=> $data['is_active'] ?? true,
                'section_id'=> $data['section_id'] ?? null,
                'category_id'=> $data['category_id'] ?? null,
            ]
        );
        return response()->json($prod, 201);
    }

    public function variants(int $storeId, int $productId)
    {
        $this->assertStoreOwner($storeId);
        return ProductVariant::where('product_id',$productId)->orderBy('id')->get();
    }

    public function upsertVariant(int $storeId, int $productId, VariantUpsertRequest $request)
    {
        $this->assertStoreOwner($storeId);
        $data = $request->validated();
        $data['product_id'] = $productId;

        $variant = ProductVariant::updateOrCreate(
            ['product_id'=>$productId,'sku'=>$data['sku']],
            [
                'name'=>$data['name'] ?? null,
                'price_cents'=>$data['price_cents'],
                'stock_qty'=>$data['stock_qty'] ?? 0,
                'is_active'=>$data['is_active'] ?? true,
            ]
        );
        return response()->json($variant, 201);
    }
}

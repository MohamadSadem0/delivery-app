<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductVariantResource;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $q = Product::query()->where('is_active', true);
        if ($request->filled('store_id')) $q->where('store_id', $request->store_id);
        if ($request->filled('q')) $q->where('name', 'like', '%'.$request->q.'%');
        return ProductResource::collection($q->orderBy('name')->paginate(20));
    }

    public function show(int $id)
    {
        $product = Product::findOrFail($id);
        $variants = ProductVariant::where('product_id', $id)->where('is_active', true)->get();
        return response()->json(['product' => new ProductResource($product), 'variants' => ProductVariantResource::collection($variants)]);
    }
}

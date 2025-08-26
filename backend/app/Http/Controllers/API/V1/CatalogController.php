<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Catalog\Models\Category;
use App\Domain\Catalog\Models\Product;
use App\Http\Resources\Catalog\ProductResource;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function categories(Request $request)
    {
        $categories = Category::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id','name','slug','parent_id']);

        return response()->json(['data' => $categories]);
    }

    public function products(Request $request)
    {
        $filters = $request->only([
            'q','category_id','store_id','min_price','max_price','on_sale','sort'
        ]);

        $perPage = min((int) $request->get('per_page', 20), 100);

        $products = Product::query()
            ->with('category:id,name,slug')
            ->filter($filters)
            ->paginate($perPage)
            ->appends($filters);

        return ProductResource::collection($products);
    }

    public function show(Product $product)
    {
        $product->load('category:id,name,slug');
        return new ProductResource($product);
    }
}

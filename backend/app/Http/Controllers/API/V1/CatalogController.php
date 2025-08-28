<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Catalog\Models\Category;
use App\Domain\Catalog\Models\Product;
use App\Http\Resources\Catalog\ProductResource;
use Illuminate\Http\Request;
use App\Domain\Store\Models\Section;
class CatalogController extends Controller
{


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
public function categories(Request $request)
{
    $q = Category::query()->active();

    if ($request->filled('section_id')) {
        $q->inSection((int)$request->integer('section_id'));
    }
    if ($request->filled('section_slug')) {
        $q->whereHas('section', fn($qq) => $qq->where('slug', $request->string('section_slug')));
    }

    return response()->json($q->orderBy('name')->get(['id','section_id','name','slug']));
}
    public function show(Product $product)
    {
        $product->load('category:id,name,slug');
        return new ProductResource($product);
    }
}

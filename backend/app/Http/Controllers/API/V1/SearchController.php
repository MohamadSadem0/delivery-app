<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Catalog\Services\ProductSearchService;
use App\Http\Resources\Catalog\ProductResource;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct(protected ProductSearchService $search) {}

    public function products(Request $request)
    {
        $filters = $request->only(['q','category_id','store_id','min_price','max_price','on_sale','sort']);
        $per = (int) $request->get('per_page', 20);
        $result = $this->search->searchWithFacets($filters, $per);

        return response()->json([
            'data' => ProductResource::collection($result['data'])->response()->getData(true),
            'facets' => $result['facets'],
        ]);
    }
}

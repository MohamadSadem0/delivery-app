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

        // Build the resource response once
        $resourceArray = ProductResource::collection($result['data'])
            ->response()
            ->getData(true); // ['data' => [...], 'links' => ..., 'meta' => ...]

        // Backward-compatible default (legacy shape)
        // data = full resource payload (including meta/links) + separate facets
        $envelope = strtolower((string) $request->query('envelope', 'v1'));
        if ($envelope !== 'v2') {
            return response()->json([
                'data'   => $resourceArray,
                'facets' => $result['facets'] ?? null,
            ]);
        }

        // Opt-in normalized envelope
        return response()->json([
            'data'   => $resourceArray['data']  ?? [],
            'meta'   => $resourceArray['meta']  ?? null,
            'links'  => $resourceArray['links'] ?? null,
            'facets' => $result['facets']       ?? null,
        ]);
    }
}

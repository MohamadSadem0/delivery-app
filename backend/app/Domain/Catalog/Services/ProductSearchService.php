<?php

namespace App\Domain\Catalog\Services;

use App\Domain\Catalog\Repositories\Contracts\ProductRepository;
use Illuminate\Support\Facades\Cache;

class ProductSearchService
{
    public function __construct(protected ProductRepository $products) {}

    public function searchWithFacets(array $filters, int $perPage = 20): array
    {
        $cacheKey = 'search:'.md5(json_encode($filters).":$perPage");
        return Cache::remember($cacheKey, 60, function () use ($filters, $perPage) {
            $paginator = $this->products->search($filters, $perPage);

            // facet counts (basic example)
            $facets = [
                'total' => $paginator->total(),
                'category_counts' => [],
                'store_counts' => [],
            ];

            foreach ($paginator->items() as $item) {
                $cat = $item->category?->name ?? 'Uncategorized';
                $facets['category_counts'][$cat] = ($facets['category_counts'][$cat] ?? 0) + 1;

                $store = 'Store #'.$item->store_id;
                $facets['store_counts'][$store] = ($facets['store_counts'][$store] ?? 0) + 1;
            }

            return [
                'data' => $paginator,
                'facets' => $facets,
            ];
        });
    }
}

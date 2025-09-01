<?php

namespace App\Domain\Catalog\Services;

use App\Domain\Catalog\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FullTextSearchService
{
    public function search(string $query, int $perPage = 20): LengthAwarePaginator
    {
        return Product::query()
            ->whereRaw("MATCH(name,description) AGAINST(? IN BOOLEAN MODE)", [$query])
            ->paginate($perPage);
    }
}

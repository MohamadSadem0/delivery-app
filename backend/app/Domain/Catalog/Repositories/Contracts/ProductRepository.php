<?php

namespace App\Domain\Catalog\Repositories\Contracts;

use App\Domain\Catalog\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface ProductRepository
{
    public function search(array $filters, int $perPage = 20): LengthAwarePaginator;

    /** Atomic decrement (throws if insufficient) */
    public function decrementStock(int $productId, int $qty): void;

    public function find(int $id): ?Product;

    /** Optional: lightweight facets (category/store counts) */
    public function facetCounts(array $filters): array;
}

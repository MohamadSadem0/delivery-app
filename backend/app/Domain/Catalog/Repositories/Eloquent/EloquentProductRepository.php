<?php

namespace App\Domain\Catalog\Repositories\Eloquent;

use App\Domain\Catalog\Repositories\Contracts\ProductRepository;
use App\Domain\Catalog\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentProductRepository implements ProductRepository
{
    public function search(array $filters, int $perPage = 20): LengthAwarePaginator
    {
        $q = Product::query()->with('category:id,name,slug')->filter($filters);
        return $q->paginate(min($perPage, 100))->appends($filters);
    }

    public function decrementStock(int $productId, int $qty): bool
    {
        return (bool) Product::where('id', $productId)->where('stock', '>=', $qty)->decrement('stock', $qty);
    }
}

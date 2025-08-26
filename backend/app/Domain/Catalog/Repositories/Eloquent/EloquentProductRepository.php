<?php

namespace App\Domain\Catalog\Repositories\Eloquent;

use App\Domain\Catalog\Models\Product;
use App\Domain\Catalog\Repositories\Contracts\ProductRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class EloquentProductRepository implements ProductRepository
{
    public function search(array $filters, int $perPage = 20): LengthAwarePaginator
    {
        $q = Product::query()->where('is_active', true);

        if (!empty($filters['q'])) {
            $term = $filters['q'];
            $q->where(function ($x) use ($term) {
                $x->where('name', 'like', "%{$term}%")
                  ->orWhere('description', 'like', "%{$term}%");
            });
        }
        if (!empty($filters['category_id'])) {
            $q->where('category_id', (int) $filters['category_id']);
        }
        if (!empty($filters['store_id'])) {
            $q->where('store_id', (int) $filters['store_id']);
        }
        if (!empty($filters['min_price'])) {
            $q->where('price', '>=', (int) $filters['min_price']);
        }
        if (!empty($filters['max_price'])) {
            $q->where('price', '<=', (int) $filters['max_price']);
        }

        return $q->orderByDesc('id')->paginate($perPage);
    }

    public function decrementStock(int $productId, int $qty): void
    {
        $affected = DB::table('products')
            ->where('id', $productId)
            ->where('stock', '>=', $qty)
            ->decrement('stock', $qty);

        if ($affected === 0) {
            throw new \RuntimeException('Insufficient stock');
        }
    }

    public function find(int $id): ?Product
    {
        return Product::find($id);
    }

    public function facetCounts(array $filters): array
    {
        $base = Product::query()->where('is_active', true);

        if (!empty($filters['q'])) {
            $term = $filters['q'];
            $base->where(function ($x) use ($term) {
                $x->where('name', 'like', "%{$term}%")
                  ->orWhere('description', 'like', "%{$term}%");
            });
        }

        $categories = (clone $base)
            ->selectRaw('category_id, COUNT(*) as cnt')
            ->groupBy('category_id')
            ->pluck('cnt', 'category_id')
            ->toArray();

        $stores = (clone $base)
            ->selectRaw('store_id, COUNT(*) as cnt')
            ->groupBy('store_id')
            ->pluck('cnt', 'store_id')
            ->toArray();

        return ['categories' => $categories, 'stores' => $stores];
    }
}

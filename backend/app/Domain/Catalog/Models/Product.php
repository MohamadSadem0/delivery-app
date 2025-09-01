<?php

namespace App\Domain\Catalog\Models;

use App\Domain\Store\Models\Section;
use App\Domain\Store\Models\Store;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'store_id', 'category_id', 'name', 'slug', 'description',
        'price', 'sale_price', 'currency', 'stock', 'is_active',
    ];

    protected $casts = [
        'price'      => 'integer',
        'sale_price' => 'integer',
        'stock'      => 'integer',
        'is_active'  => 'boolean',
    ];

    # Relationships
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    # Helpers
    public function getEffectivePriceAttribute(): int
    {
        return (int)($this->sale_price ?: $this->price);
    }

    /**
     * scopeFilter supports:
     * - q
     * - category_id
     * - category_slug
     * - section_id
     * - section_slug
     * - store_id / store_slug
     * - min_price / max_price  (cents)
     * - on_sale (bool)
     * - sort: price_asc|price_desc|newest|name
     */
    public function scopeFilter(Builder $q, array $filters): Builder
    {
        $q->where('is_active', true);

        // join categories or stores lazily if needed
        $joinCategory = function () use ($q) {
            // guard against double-join
            $joins = collect($q->getQuery()->joins ?? [])->map(fn($j) => $j->table);
            if (!$joins->contains('categories')) {
                $q->join('categories', 'categories.id', '=', 'products.category_id');
            }
        };
        $joinStore = function () use ($q) {
            $joins = collect($q->getQuery()->joins ?? [])->map(fn($j) => $j->table);
            if (!$joins->contains('stores')) {
                $q->join('stores', 'stores.id', '=', 'products.store_id');
            }
        };

        // search
        if (!empty($filters['q'])) {
            $q->where(function ($qq) use ($filters) {
                $k = '%' . $filters['q'] . '%';
                $qq->where('products.name', 'like', $k)
                   ->orWhere('products.description', 'like', $k);
            });
        }

        // by category
        if (!empty($filters['category_id'])) {
            $q->where('products.category_id', (int)$filters['category_id']);
        }
        if (!empty($filters['category_slug'])) {
            $joinCategory();
            $q->where('categories.slug', $filters['category_slug']);
        }

        // by section
        if (!empty($filters['section_id'])) {
            $joinCategory();
            $q->where('categories.section_id', (int)$filters['section_id']);
        }
        if (!empty($filters['section_slug'])) {
            $joinCategory();
            $q->join('sections', 'sections.id', '=', 'categories.section_id')
              ->where('sections.slug', $filters['section_slug']);
        }

        // by store
        if (!empty($filters['store_id'])) {
            $q->where('products.store_id', (int)$filters['store_id']);
        }
        if (!empty($filters['store_slug'])) {
            $joinStore();
            $q->where('stores.slug', $filters['store_slug']);
        }

        // price window (in cents)
        if (!empty($filters['min_price'])) {
            $q->where(function ($qq) use ($filters) {
                $qq->where(function ($q2) use ($filters) {
                    $q2->whereNotNull('products.sale_price')
                       ->where('products.sale_price', '>=', (int)$filters['min_price']);
                })->orWhere(function ($q3) use ($filters) {
                    $q3->where(function ($qx) {
                        $qx->whereNull('products.sale_price')->orWhere('products.sale_price', 0);
                    })->where('products.price', '>=', (int)$filters['min_price']);
                });
            });
        }
        if (!empty($filters['max_price'])) {
            $q->where(function ($qq) use ($filters) {
                $qq->where(function ($q2) use ($filters) {
                    $q2->whereNotNull('products.sale_price')
                       ->where('products.sale_price', '<=', (int)$filters['max_price']);
                })->orWhere(function ($q3) use ($filters) {
                    $q3->where(function ($qx) {
                        $qx->whereNull('products.sale_price')->orWhere('products.sale_price', 0);
                    })->where('products.price', '<=', (int)$filters['max_price']);
                });
            });
        }

        if (($filters['on_sale'] ?? null) !== null) {
            $onSale = filter_var($filters['on_sale'], FILTER_VALIDATE_BOOLEAN);
            if ($onSale) {
                $q->whereNotNull('products.sale_price')->where('products.sale_price', '>', 0);
            } else {
                $q->where(function ($qq) {
                    $qq->whereNull('products.sale_price')->orWhere('products.sale_price', 0);
                });
            }
        }

        // Sorting
        switch ($filters['sort'] ?? '') {
            case 'price_asc':
                // order by effective price (sale first, then price)
                $q->orderByRaw('COALESCE(products.sale_price, products.price) ASC');
                break;
            case 'price_desc':
                $q->orderByRaw('COALESCE(products.sale_price, products.price) DESC');
                break;
            case 'newest':
                $q->orderBy('products.created_at', 'desc');
                break;
            case 'name':
            default:
                $q->orderBy('products.name', 'asc');
        }

        return $q->select('products.*');
    }
}

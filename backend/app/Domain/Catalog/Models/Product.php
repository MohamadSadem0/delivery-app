<?php

namespace App\Domain\Catalog\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'store_id', 'category_id', 'name', 'slug', 'description',
        'price', 'sale_price', 'currency', 'stock', 'is_active'
    ];

    protected $casts = [
        'price' => 'integer',
        'sale_price' => 'integer',
        'stock' => 'integer',
        'is_active' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeFilter(Builder $q, array $filters): Builder
    {
        $q->where('is_active', true);

        if (!empty($filters['q'])) {
            $q->where(function ($qq) use ($filters) {
                $qq->where('name', 'like', '%' . $filters['q'] . '%')
                   ->orWhere('description', 'like', '%' . $filters['q'] . '%');
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

        if (($filters['on_sale'] ?? null) !== null) {
            $onSale = filter_var($filters['on_sale'], FILTER_VALIDATE_BOOLEAN);
            if ($onSale) {
                $q->whereNotNull('sale_price')->where('sale_price', '>', 0);
            } else {
                $q->where(function ($qq) {
                    $qq->whereNull('sale_price')->orWhere('sale_price', 0);
                });
            }
        }

        // Sorting
        switch ($filters['sort'] ?? '') {
            case 'price_asc':
                $q->orderBy('sale_price', 'asc')->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $q->orderBy('sale_price', 'desc')->orderBy('price', 'desc');
                break;
            case 'newest':
                $q->orderBy('created_at', 'desc');
                break;
            default:
                $q->orderBy('name', 'asc');
        }

        return $q;
    }
}

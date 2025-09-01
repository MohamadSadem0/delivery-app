<?php

namespace App\Domain\Catalog\Services;

use Illuminate\Support\Facades\DB;

class FullTextProductSearch
{
    public function search(string $query, int $limit = 20): array
    {
        $query = trim($query);
        if ($query === '') return [];

        try {
            $rows = DB::select("
                SELECT id, name, slug, description,
                       MATCH(name, description) AGAINST(? IN NATURAL LANGUAGE MODE) AS score
                FROM products
                WHERE MATCH(name, description) AGAINST(? IN NATURAL LANGUAGE MODE)
                ORDER BY score DESC
                LIMIT ?
            ", [$query, $query, $limit]);

            return array_map(fn($r) => (array) $r, $rows);
        } catch (\Throwable $e) {
            // Fallback to LIKE for non-MySQL or if index missing
            $like = '%' . $query . '%';
            $rows = DB::table('products')
                ->select('id','name','slug','description')
                ->where('name', 'like', $like)
                ->orWhere('description', 'like', $like)
                ->orderBy('name')
                ->limit($limit)
                ->get()
                ->toArray();

            return array_map(fn($r) => (array) $r, $rows);
        }
    }
}

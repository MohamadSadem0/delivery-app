<?php

namespace App\Domain\Catalog\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ProductRepository
{
    public function search(array $filters, int $perPage = 20): LengthAwarePaginator;
    public function decrementStock(int $productId, int $qty): bool;
}

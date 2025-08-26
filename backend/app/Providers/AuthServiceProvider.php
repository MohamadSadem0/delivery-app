<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Domain\Store\Models\Store;
use App\Domain\Store\Policies\StorePolicy;
use App\Domain\Catalog\Models\Product;
use App\Domain\Catalog\Policies\ProductPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Store::class => StorePolicy::class,
        Product::class => ProductPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}

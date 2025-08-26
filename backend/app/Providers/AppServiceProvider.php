<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;
use App\Observers\AuditableObserver;
use App\Domain\Order\Models\Order;
use App\Domain\Catalog\Models\Product;
use App\Domain\Catalog\Repositories\Contracts\ProductRepository;
use App\Domain\Catalog\Repositories\Eloquent\EloquentProductRepository;
use App\Support\Fx\FxRateProvider;
use App\Support\Fx\StaticFxRateProvider;

class AppServiceProvider extends ServiceProvider
{
    // public function register(): void
    // {
    //     $this->app->bind(ProductRepository::class, EloquentProductRepository::class);
    // }

    public function register(): void
{
    $this->app->bind(FxRateProvider::class, StaticFxRateProvider::class);
}
    public function boot(): void
    {
        // Polymorphic map for audits (optional)
        Relation::morphMap([
            'order' => Order::class,
            'product' => Product::class,
        ]);

        // Register observers
        Order::observe(AuditableObserver::class);
        Product::observe(AuditableObserver::class);
    }
}

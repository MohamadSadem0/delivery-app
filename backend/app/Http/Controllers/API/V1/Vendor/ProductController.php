<?php

namespace App\Http\Controllers\API\V1\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\StoreProductRequest;
use App\Http\Requests\Catalog\UpdateProductRequest;
use App\Http\Resources\Catalog\ProductAdminResource;
use App\Domain\Catalog\Models\Product;
use App\Domain\Store\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    protected function vendorStoreId(): int
    {
        $store = Store::where('user_id', auth('api')->id())->firstOrFail();
        return (int) $store->id;
    }

    public function index(Request $request)
    {
        $storeId = $this->vendorStoreId();

        $products = Product::query()
            ->where('store_id', $storeId)
            ->orderByDesc('id')
            ->paginate(20);

        return ProductAdminResource::collection($products);
    }

    public function show(Product $product)
    {
        $this->authorizeProduct($product);
        return new ProductAdminResource($product);
    }

    public function store(StoreProductRequest $request)
    {
        $storeId = $this->vendorStoreId();
        $data = $request->validated();
        $data['store_id'] = $storeId;
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        $product = Product::create($data);
        return (new ProductAdminResource($product))->additional(['message' => 'Product created'])->response()->setStatusCode(201);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->authorizeProduct($product);
        $data = $request->validated();

        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $product->update($data);
        return (new ProductAdminResource($product))->additional(['message' => 'Product updated']);
    }

    public function destroy(Product $product)
    {
        $this->authorizeProduct($product);
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }

    protected function authorizeProduct(Product $product): void
    {
        $storeId = $this->vendorStoreId();
        abort_unless($product->store_id === $storeId, 404);
    }
}

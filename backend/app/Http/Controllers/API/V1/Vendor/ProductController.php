<?php

namespace App\Http\Controllers\API\V1\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\StoreProductRequest;
use App\Http\Requests\Catalog\UpdateProductRequest;
use App\Http\Resources\Catalog\ProductAdminResource;
use App\Domain\Catalog\Models\Product;
use App\Domain\Catalog\Models\Category;
use App\Domain\Store\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    protected function vendorStore(): Store
    {
        return Store::where('user_id', auth('api')->id())->firstOrFail();
    }

    protected function vendorStoreId(): int
    {
        return (int)$this->vendorStore()->id;
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
        return new ProductAdminResource($product->load('category'));
    }

    public function store(StoreProductRequest $request)
    {
        $store = $this->vendorStore();
        $data  = $request->validated();

        // Ensure the category belongs to this store's section
        /** @var Category|null $cat */
        $cat = Category::find($data['category_id'] ?? null);
        if (!$cat || (int)$cat->section_id !== (int)$store->section_id) {
            return response()->json(['message' => 'Selected category does not belong to your store’s section.'], 422);
        }

        // Generate slug if not provided
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        // Scoped slug uniqueness per store
        $request->validate([
            'slug' => [
                'required','string','max:255',
                Rule::unique('products', 'slug')->where(fn($q) => $q->where('store_id', $store->id)),
            ],
        ]);

        // Sale price sanity
        if (!empty($data['sale_price']) && (int)$data['sale_price'] > (int)$data['price']) {
            return response()->json(['message' => 'sale_price cannot exceed price'], 422);
        }

        $data['store_id'] = $store->id;

        $product = Product::create($data);

        return (new ProductAdminResource($product->load('category')))
            ->additional(['message' => 'Product created'])
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->authorizeProduct($product);
        $store = $this->vendorStore();
        $data  = $request->validated();

        // If category is changing, enforce section consistency
        if (array_key_exists('category_id', $data)) {
            $cat = Category::find($data['category_id']);
            if (!$cat || (int)$cat->section_id !== (int)$store->section_id) {
                return response()->json(['message' => 'Selected category does not belong to your store’s section.'], 422);
            }
        }

        // Auto-slug if name changed and slug omitted
        if (!empty($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        // Scoped slug uniqueness per store (ignore current product)
        if (!empty($data['slug'])) {
            $request->validate([
                'slug' => [
                    'string','max:255',
                    Rule::unique('products', 'slug')
                        ->where(fn($q) => $q->where('store_id', $store->id))
                        ->ignore($product->id),
                ],
            ]);
        }

        // Sale price sanity
        if (isset($data['sale_price'], $data['price']) && (int)$data['sale_price'] > (int)$data['price']) {
            return response()->json(['message' => 'sale_price cannot exceed price'], 422);
        }

        $product->update($data);

        return (new ProductAdminResource($product->fresh('category')))
            ->additional(['message' => 'Product updated']);
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
        abort_unless((int)$product->store_id === (int)$storeId, 404);
    }
}

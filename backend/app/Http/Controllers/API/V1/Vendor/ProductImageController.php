<?php

namespace App\Http\Controllers\API\V1\Vendor;

use App\Http\Controllers\Controller;
use App\Domain\Catalog\Models\Product;
use App\Domain\Catalog\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $request->validate(['image' => ['required','image','max:2048']]);

        // Check ownership
        if ($product->store->user_id !== auth('api')->id()) {
            abort(403);
        }

        $path = $request->file('image')->store('products','public');
        $image = $product->images()->create([
            'path' => $path,
            'is_primary' => $product->images()->count() === 0,
        ]);

        return response()->json($image, 201);
    }

    public function destroy(Product $product, ProductImage $image)
    {
        if ($product->store->user_id !== auth('api')->id() || $image->product_id !== $product->id) {
            abort(403);
        }

        Storage::disk('public')->delete($image->path);
        $image->delete();

        return response()->json(['message' => 'Image deleted']);
    }
}

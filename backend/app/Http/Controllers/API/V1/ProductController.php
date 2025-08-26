<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Catalog\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'store_id' => ['required','integer','exists:stores,id'],
            'category_id' => ['required','integer','exists:categories,id'],
            'name' => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'price' => ['required','integer','min:0'],
            'sale_price' => ['nullable','integer','min:0'],
            'stock' => ['required','integer','min:0'],
            'is_active' => ['boolean'],
        ]);
        $product = Product::create($data);
        return response()->json($product, 201);
    }

    public function update(Request $request, Product $product)
    {
        $this->authorize('update', $product);
        $data = $request->validate([
            'name' => ['sometimes','string','max:255'],
            'description' => ['nullable','string'],
            'price' => ['sometimes','integer','min:0'],
            'sale_price' => ['nullable','integer','min:0'],
            'stock' => ['sometimes','integer','min:0'],
            'is_active' => ['boolean'],
        ]);
        $product->update($data);
        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);
        $product->delete();
        return response()->json(['message' => 'Deleted']);
    }
}

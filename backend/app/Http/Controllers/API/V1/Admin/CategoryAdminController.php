<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Category\StoreCategoryRequest;
use App\Http\Requests\Admin\Category\UpdateCategoryRequest;
use App\Domain\Catalog\Models\Category;
use App\Domain\Catalog\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = Category::query()->orderBy('name');

        if ($sid = (int) $request->input('section_id')) {
            $q->where('section_id', $sid);
        }
        if ($search = $request->string('q')->toString()) {
            $q->where(function ($qq) use ($search) {
                $qq->where('name','like',"%{$search}%")
                   ->orWhere('slug','like',"%{$search}%");
            });
        }
        if (!is_null($request->input('is_active'))) {
            $q->where('is_active', filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        return response()->json($q->paginate(20));
    }

    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        $category = Category::create([
            'section_id' => $data['section_id'],
            'name'       => $data['name'],
            'slug'       => $data['slug'],
            'is_active'  => $data['is_active'] ?? true,
        ]);

        return response()->json(['message' => 'Category created', 'data' => $category], 201);
    }

    public function show(Category $category)
    {
        return response()->json($category);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();
        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $category->update($data);

        return response()->json(['message' => 'Category updated', 'data' => $category]);
    }

    public function destroy(Category $category)
    {
        $productCount = Product::where('category_id', $category->id)->count();
        if ($productCount > 0) {
            return response()->json([
                'message' => 'Cannot delete category while products still reference it',
                'products' => $productCount,
            ], 422);
        }

        $category->delete();
        return response()->json(['message' => 'Category deleted']);
    }
}

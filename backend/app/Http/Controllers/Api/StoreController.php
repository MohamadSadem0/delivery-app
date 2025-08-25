<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StoreResource;
use App\Models\Store;
use App\Models\Section;
use App\Models\Product;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index(Request $request)
    {
        $q = Store::query();
        if ($request->filled('type')) $q->where('type', $request->type);
        if ($request->filled('q'))    $q->where('name', 'like', '%'.$request->q.'%');
        return StoreResource::collection($q->orderBy('name')->paginate(20));
    }

    public function show(int $id)
    {
        $store = Store::findOrFail($id);
        return new StoreResource($store);
    }

    public function sections(int $id)
    {
        $sections = Section::where('store_id', $id)->orderBy('sort_order')->get();
        return $sections;
    }

    public function products(int $id, Request $request)
    {
        $q = Product::where('store_id', $id)->where('is_active', true);
        if ($request->filled('section_id'))  $q->where('section_id', $request->section_id);
        if ($request->filled('category_id')) $q->where('category_id', $request->category_id);
        if ($request->filled('q'))           $q->where('name', 'like', '%'.$request->q.'%');
        return $q->orderBy('name')->paginate(20);
    }
}

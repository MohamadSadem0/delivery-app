<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Section\StoreSectionRequest;
use App\Http\Requests\Admin\Section\UpdateSectionRequest;
use App\Domain\Store\Models\Section;
use App\Domain\Store\Models\Store;
use App\Domain\Catalog\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SectionAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = Section::query()->orderBy('name');

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

    public function store(StoreSectionRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        $section = Section::create([
            'name'      => $data['name'],
            'slug'      => $data['slug'],
            'is_active' => $data['is_active'] ?? true,
        ]);

        return response()->json(['message' => 'Section created', 'data' => $section], 201);
    }

    public function show(Section $section)
    {
        return response()->json($section);
    }

    public function update(UpdateSectionRequest $request, Section $section)
    {
        $data = $request->validated();
        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $section->update($data);

        return response()->json(['message' => 'Section updated', 'data' => $section]);
    }

    public function destroy(Section $section)
    {
        $storeCount    = Store::where('section_id', $section->id)->count();
        $categoryCount = Category::where('section_id', $section->id)->count();

        if ($storeCount > 0 || $categoryCount > 0) {
            return response()->json([
                'message' => 'Cannot delete section while stores or categories still reference it',
                'stores' => $storeCount,
                'categories' => $categoryCount,
            ], 422);
        }

        $section->delete();
        return response()->json(['message' => 'Section deleted']);
    }
}

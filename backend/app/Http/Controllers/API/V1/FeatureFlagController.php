<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Feature\Models\FeatureFlag;
use Illuminate\Http\Request;

class FeatureFlagController extends Controller
{
    public function index(Request $request)
    {
        $q = FeatureFlag::query()->orderBy('key');
        if ($scope = $request->string('scope_type')->toString()) $q->where('scope_type',$scope);
        if ($key = $request->string('key')->toString()) $q->where('key',$key);
        return response()->json($q->paginate(50));
    }

    public function upsert(Request $request)
    {
        $data = $request->validate([
            'key' => ['required','string','max:100'],
            'value' => ['required','boolean'],
            'scope_type' => ['required','in:global,user,store'],
            'scope_id' => ['nullable','integer'],
            'is_active' => ['boolean'],
            'starts_at' => ['nullable','date'],
            'ends_at' => ['nullable','date'],
            'meta' => ['nullable','array'],
        ]);

        $flag = FeatureFlag::updateOrCreate(
            ['key'=>$data['key'], 'scope_type'=>$data['scope_type'], 'scope_id'=>$data['scope_id'] ?? null],
            [
                'value' => (bool)$data['value'],
                'is_active' => (bool)($data['is_active'] ?? true),
                'starts_at' => $data['starts_at'] ?? null,
                'ends_at' => $data['ends_at'] ?? null,
                'meta' => $data['meta'] ?? null,
            ]
        );

        return response()->json(['message'=>'Flag saved','flag'=>$flag]);
    }

    public function destroy(FeatureFlag $flag)
    {
        $flag->delete();
        return response()->json(['message'=>'Flag deleted']);
    }
}

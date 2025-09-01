<?php

namespace App\Domain\Feature\Services;

use App\Domain\Feature\Models\FeatureFlag;
use Illuminate\Support\Carbon;

class FeatureFlagService
{
    public function enabled(string $key, ?int $userId = null, ?int $storeId = null): bool
    {
        $now = Carbon::now();

        // precedence: user > store > global
        $flag = FeatureFlag::where('key', $key)
            ->where(function ($q) use ($userId, $storeId) {
                $q->where(function ($q2) use ($userId) {
                    $q2->where('scope_type','user')->where('scope_id',$userId);
                })->orWhere(function ($q3) use ($storeId) {
                    $q3->where('scope_type','store')->where('scope_id',$storeId);
                })->orWhere(function ($q4) {
                    $q4->where('scope_type','global')->whereNull('scope_id');
                });
            })
            ->orderByRaw("FIELD(scope_type, 'user','store','global')")
            ->first();

        if (!$flag) return (bool) config("featureflags.defaults.$key", false);

        if (!$flag->is_active) return false;
        if ($flag->starts_at && $flag->starts_at->isFuture()) return false;
        if ($flag->ends_at && $flag->ends_at->isPast()) return false;

        return (bool) $flag->value;
    }
}

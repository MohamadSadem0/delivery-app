<?php

namespace App\Domain\FeatureFlags\Services;

use App\Domain\FeatureFlags\Models\FeatureFlag;

class FeatureFlagService
{
    public function isEnabled(string $key, ?string $scopeType=null, ?int $scopeId=null): bool
    {
        if ($scopeType && $scopeId) {
            $flag = FeatureFlag::where(compact('key','scope_type','scope_id'))->first();
            if ($flag) return (bool)$flag->value;
        }

        $global = FeatureFlag::where('key',$key)->whereNull('scope_type')->whereNull('scope_id')->first();
        return $global? (bool)$global->value : config("featureflags.defaults.$key", false);
    }
}

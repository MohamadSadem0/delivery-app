<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Domain\Feature\Services\FeatureFlagService;

class CheckFeatureFlag
{
    public function __construct(protected FeatureFlagService $flags) {}

    public function handle(Request $request, Closure $next, string $featureKey)
    {
        $user = $request->user('api');
        $storeId = null;
        // If vendor, optionally resolve their store here (pseudo, adapt as needed)
        if ($user && method_exists($user, 'store')) {
            $storeId = optional($user->store)->id;
        }

        if (!$this->flags->enabled($featureKey, $user?->id, $storeId)) {
            return response()->json(['message' => 'Feature not available'], 404);
        }
        return $next($request);
    }
}

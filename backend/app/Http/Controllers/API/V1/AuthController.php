<?php

namespace App\Http\Controllers\API\V1;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\User\UserResource;
use App\Domain\User\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
// at the top with other imports

// ✅ add these:
use Illuminate\Support\Facades\Schema;
use App\Domain\Store\Models\Store;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        $token = JWTAuth::fromUser($user); // always returns the token string

        return response()->json([
            'token_type' => 'bearer',
            'access_token' => $token,
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => new UserResource($user),
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'token_type' => 'bearer',
            'access_token' => $token,
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => new UserResource(auth('api')->user()),
        ]);
    }

    public function me(Request $request)
    {
        return new UserResource(auth('api')->user());
    }

    public function refresh()
    {
        $token = JWTAuth::refresh();
        return response()->json([
            'token_type' => 'bearer',
            'access_token' => $token,
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
        ]);
    }

    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Logged out']);
    }

public function updateProfile(Request $request)
{
    // Use concrete model to satisfy the IDE and guarantee non-null
    /** @var User $user */
    $user = User::findOrFail(auth('api')->id());

    $validated = $request->validate([
        'name'  => ['sometimes','string','max:255'],
        'phone' => ['sometimes','nullable','string','max:30'],
    ]);

    $user->fill($validated);
    $user->save();

    return new UserResource($user);
}
    public function changePassword(Request $request)
{
    // ensure we have an authenticated ID, and fetch a concrete Eloquent model
    $userId = auth('api')->id();
    if (!$userId) {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    /** @var User $user */
    $user = User::findOrFail($userId);

    $data = $request->validate([
        'current_password' => ['required', 'string'],
        'password'         => ['required', 'string', Password::min(8), 'confirmed'],
    ]);

    if (!Hash::check($data['current_password'], $user->password)) {
        return response()->json(['message' => 'Current password is incorrect'], 422);
    }

    // either of these is fine; both keep the IDE happy:
    // $user->update(['password' => Hash::make($data['password'])]);

    $user->forceFill([
        'password' => Hash::make($data['password']),
    ])->save();

    return response()->json(['message' => 'Password updated']);
}

    public function registerVendor(Request $request)
    {
        $data = $request->validate([
            'name'         => ['required','string','max:255'],
            'email'        => ['required','string','email','max:255','unique:users,email'],
            'password'     => ['required','string','min:8','confirmed'],
            'country_code' => ['nullable','string','size:2'],
            'phone'        => ['nullable','string','max:30'],
            'store_name'   => ['nullable','string','max:255'],
        ]);

        $payload = [
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'role'     => 'vendor',
        ];
        if (Schema::hasColumn('users', 'country_code') && !empty($data['country_code'])) {
            $payload['country_code'] = strtoupper($data['country_code']);
        }
        if (Schema::hasColumn('users', 'phone') && !empty($data['phone'])) {
            $payload['phone'] = $data['phone'];
        }

        $user = User::create($payload);

        // Auto-create a Store for the vendor (soft-fails if schema differs)
        if (class_exists(Store::class) && Schema::hasTable('stores')) {
            $store = [
                'user_id' => $user->id,
                'name'    => $data['store_name'] ?? ($user->name . "'s Store"),
            ];
            if (Schema::hasColumn('stores','is_active')) $store['is_active'] = false;
            if (Schema::hasColumn('stores','status'))    $store['status'] = 'pending_review';
            try { Store::create($store); } catch (\Throwable $e) {}
        }

        $token = JWTAuth::fromUser($user); // always returns the token string


        return response()->json([
            'token_type'   => 'bearer',
            'access_token' => $token,
            'expires_in'   => JWTAuth::factory()->getTTL() * 60,
            'user'         => [
                'id'           => $user->id,
                'name'         => $user->name,
                'email'        => $user->email,
                'role'         => $user->role,
                'country_code' => $user->country_code ?? null,
                'created_at'   => $user->created_at?->toIso8601String(),
            ],
        ], 201);
    }

    public function registerDelivery(Request $request)
    {
        $data = $request->validate([
            'name'         => ['required','string','max:255'],
            'email'        => ['required','string','email','max:255','unique:users,email'],
            'password'     => ['required','string','min:8','confirmed'],
            'country_code' => ['nullable','string','size:2'],
            'phone'        => ['nullable','string','max:30'],
        ]);

        $payload = [
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'role'     => 'delivery',
        ];
        if (Schema::hasColumn('users', 'country_code') && !empty($data['country_code'])) {
            $payload['country_code'] = strtoupper($data['country_code']);
        }
        if (Schema::hasColumn('users', 'phone') && !empty($data['phone'])) {
            $payload['phone'] = $data['phone'];
        }

        $user = User::create($payload);

$token = JWTAuth::fromUser($user); // always returns the token string

        return response()->json([
            'token_type'   => 'bearer',
            'access_token' => $token,
            'expires_in'   => JWTAuth::factory()->getTTL() * 60,
            'user'         => [
                'id'           => $user->id,
                'name'         => $user->name,
                'email'        => $user->email,
                'role'         => $user->role,
                'country_code' => $user->country_code ?? null,
                'created_at'   => $user->created_at?->toIso8601String(),
            ],
        ], 201);
    }
}

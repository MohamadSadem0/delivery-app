<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\JWTGuard; // <-- add

class AuthController extends Controller
{
    /** @return JWTGuard */
    private function jwt(): JWTGuard
    {
        /** @var JWTGuard $guard */
        $guard = auth('api'); // 'api' guard uses 'jwt' driver in config/auth.php
        return $guard;
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        // Never let public create ADMIN
        $role = ($data['role'] ?? 'CUSTOMER');
        if ($role === 'ADMIN') {
            $role = 'CUSTOMER';
        }

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'role'     => $role,
        ]);

        $token = $this->jwt()->login($user);

        return response()->json([
            'user'       => $user,
            'token'      => $token,
            'token_type' => 'Bearer',
            'expires_in' => $this->jwt()->factory()->getTTL() * 60, // seconds
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!$token = $this->jwt()->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'user'       => $this->jwt()->user(),
            'token'      => $token,
            'token_type' => 'Bearer',
            'expires_in' => $this->jwt()->factory()->getTTL() * 60, // seconds
        ]);
    }

    public function me()
    {
        return response()->json($this->jwt()->user());
    }

    public function refresh()
    {
        return response()->json([
            'token'      => $this->jwt()->refresh(),
            'token_type' => 'Bearer',
            'expires_in' => $this->jwt()->factory()->getTTL() * 60, // seconds
        ]);
    }

    public function logout()
    {
        $this->jwt()->logout();
        return response()->json(['message' => 'Logged out']);
    }
}

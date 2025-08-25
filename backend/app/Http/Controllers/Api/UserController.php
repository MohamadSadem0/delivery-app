<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile()
    {
        return auth('api')->user();
    }

    public function addresses()
    {
        $uid = auth('api')->id();
        return UserAddress::where('user_id',$uid)->orderByDesc('is_default')->get();
    }

    public function addAddress(Request $request)
    {
        $data = $request->validate([
            'label' => ['nullable','string','max:191'],
            'country'=>['nullable','string','max:64'],
            'city'=>['nullable','string','max:64'],
            'area'=>['nullable','string','max:64'],
            'street'=>['nullable','string','max:191'],
            'building'=>['nullable','string','max:191'],
            'latitude'=>['nullable','numeric'],
            'longitude'=>['nullable','numeric'],
            'is_default'=>['nullable','boolean'],
        ]);
        $data['user_id'] = auth('api')->id();
        if (!isset($data['is_default'])) $data['is_default'] = false;

        if ($data['is_default']) {
            UserAddress::where('user_id',$data['user_id'])->update(['is_default'=>false]);
        }

        $addr = UserAddress::create($data);
        return response()->json($addr, 201);
    }
}

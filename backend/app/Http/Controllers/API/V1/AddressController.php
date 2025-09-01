<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Address\StoreAddressRequest;
use App\Http\Requests\Address\UpdateAddressRequest;
use App\Domain\Addressing\Models\UserAddress;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index(Request $request)
    {
        $addresses = UserAddress::where('user_id', auth('api')->id())
            ->orderByDesc('is_default')
            ->get();
        return response()->json($addresses);
    }

    public function store(StoreAddressRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth('api')->id();
        $address = UserAddress::create($data);
        return response()->json($address, 201);
    }

    public function update(UpdateAddressRequest $request, UserAddress $address)
    {
        $this->authorizeAddress($address);
        $address->update($request->validated());
        return response()->json($address);
    }

    public function destroy(UserAddress $address)
    {
        $this->authorizeAddress($address);
        $address->delete();
        return response()->json(['message' => 'Address removed']);
    }

    public function setDefault(UserAddress $address)
    {
        $this->authorizeAddress($address);
        $userId = auth('api')->id();
        UserAddress::where('user_id', $userId)->update(['is_default' => false]);
        $address->is_default = true;
        $address->save();
        return response()->json(['message' => 'Default address set']);
    }

    protected function authorizeAddress(UserAddress $address): void
    {
        if ($address->user_id !== auth('api')->id()) {
            abort(404);
        }
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Delivery\DeliveryOfferRequest;
use App\Http\Requests\Delivery\DeliveryStatusUpdateRequest;
use App\Models\Delivery;
use App\Models\DeliveryOffer;

class DeliveryController extends Controller
{
    public function openDeliveries()
    {
        return Delivery::where('status','SEARCHING')->orderByDesc('id')->paginate(20);
    }

    public function offer(DeliveryOfferRequest $request, int $deliveryId)
    {
        $user = auth('api')->user();
        if ($user->role !== 'DELIVERY') return response()->json(['message'=>'Forbidden'], 403);

        $delivery = Delivery::findOrFail($deliveryId);
        if (!in_array($delivery->status, ['SEARCHING','ASSIGNED'])) {
            return response()->json(['message'=>'Delivery not accepting offers'], 422);
        }
        $data = $request->validated();

        $offer = DeliveryOffer::updateOrCreate(
            ['delivery_id'=>$delivery->id,'delivery_user_id'=>$user->id],
            ['offer_price_cents'=>$data['offer_price_cents'], 'eta_minutes'=>$data['eta_minutes'] ?? null, 'status'=>'PENDING']
        );
        return response()->json(['offer'=>$offer], 201);
    }

    public function acceptOffer(int $deliveryId, int $offerId)
    {
        $delivery = Delivery::findOrFail($deliveryId);
        $offer = DeliveryOffer::where('id',$offerId)->where('delivery_id',$deliveryId)->firstOrFail();

        $delivery->delivery_user_id = $offer->delivery_user_id;
        $delivery->status = 'ASSIGNED';
        $delivery->price_cents = $offer->offer_price_cents;
        $delivery->eta_minutes = $offer->eta_minutes;
        $delivery->save();

        $offer->status = 'ACCEPTED';
        $offer->save();

        DeliveryOffer::where('delivery_id',$deliveryId)->where('id','!=',$offerId)->update(['status'=>'REJECTED']);

        return response()->json(['delivery'=>$delivery]);
    }

    public function updateStatus(DeliveryStatusUpdateRequest $request, int $deliveryId)
    {
        $delivery = Delivery::findOrFail($deliveryId);
        $user = auth('api')->user();
        if ($delivery->delivery_user_id !== $user->id && $user->role !== 'ADMIN') {
            return response()->json(['message'=>'Forbidden'], 403);
        }
        $delivery->status = $request->validated()['status'];
        $delivery->save();
        return response()->json($delivery);
    }
}

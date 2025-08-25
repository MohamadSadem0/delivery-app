<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Payment\PaymentIntentRequest;
use App\Models\Order;
use App\Models\Payment;

class PaymentController extends Controller
{
    public function createIntent(PaymentIntentRequest $request)
    {
        $data = $request->validated();
        $order = Order::where('id',$data['order_id'])->where('user_id',auth('api')->id())->firstOrFail();

        // For COD: immediately create a payment record with PENDING status.
        if ($data['provider'] === 'COD') {
            $pay = Payment::create([
                'order_id' => $order->id,
                'provider' => 'COD',
                'status' => 'PENDING',
                'amount_cents' => $order->total_cents,
            ]);
            return response()->json(['payment'=>$pay], 201);
        }

        // For Stripe: normally you'd call Stripe API to create a PaymentIntent and return client_secret.
        return response()->json(['message'=>'Stripe integration not configured'], 501);
    }
}

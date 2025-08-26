<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Order\Models\Order;
use App\Domain\Delivery\Models\Delivery;
use App\Domain\Delivery\Services\DeliveryStatusService;

class DeliveryController extends Controller
{
    public function status(Order $order, DeliveryStatusService $service)
    {
        if ($order->user_id !== auth('api')->id()) {
            abort(404);
        }

        $delivery = Delivery::where('order_id', $order->id)->first();
        if (!$delivery) {
            return response()->json([
                'message' => 'No delivery created yet',
                'order_id' => $order->id,
                'status' => 'pending'
            ]);
        }

        return response()->json($service->fetch($delivery));
    }
}

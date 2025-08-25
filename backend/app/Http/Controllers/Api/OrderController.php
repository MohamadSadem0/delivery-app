<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderStore;

class OrderController extends Controller
{
    public function list()
    {
        $orders = Order::where('user_id', auth('api')->id())->orderByDesc('id')->paginate(20);
        return OrderResource::collection($orders);
    }

    public function show(int $orderId)
    {
        $order = Order::where('id',$orderId)->where('user_id',auth('api')->id())->firstOrFail();
        $orderStores = OrderStore::where('order_id',$order->id)->get();
        return response()->json(['order'=> new OrderResource($order), 'order_stores' => $orderStores]);
    }

    public function cancel(int $orderId)
    {
        $order = Order::where('id',$orderId)->where('user_id',auth('api')->id())->firstOrFail();
        if (!in_array($order->status, ['PENDING','CONFIRMED'])) {
            return response()->json(['message'=>'Cannot cancel'], 422);
        }
        $order->status = 'CANCELLED';
        $order->save();
        return response()->json(['order'=> new OrderResource($order)]);
    }
}

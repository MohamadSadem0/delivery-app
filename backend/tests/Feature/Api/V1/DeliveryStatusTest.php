<?php

use App\Domain\User\Models\User;
use App\Domain\Order\Models\Order;
use App\Domain\Delivery\Models\Delivery;
use Tymon\JWTAuth\Facades\JWTAuth;

it('retrieves delivery status', function () {
    $user = User::factory()->create();
    $token = JWTAuth::fromUser($user);

    $order = Order::factory()->create(['user_id'=>$user->id]);
    $delivery = Delivery::factory()->create(['order_id'=>$order->id,'status'=>'in_transit']);

    $this->withHeader('Authorization',"Bearer $token");
    $res = $this->getJson("/api/v1/deliveries/{$order->id}")->assertOk()->json();
    expect($res['status'])->toBe('in_transit');
});

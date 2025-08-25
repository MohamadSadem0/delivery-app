<?php

namespace App\Services;

use App\Models\Delivery;
use App\Models\OrderStore;

class DeliveryService
{
    public function ensureDeliveryForOrderStore(OrderStore $os): Delivery
    {
        $del = Delivery::where('order_store_id', $os->id)->first();
        if ($del) return $del;

        $del = new Delivery();
        $del->order_store_id = $os->id;
        $del->status = 'SEARCHING';
        $del->save();
        return $del;
    }
}

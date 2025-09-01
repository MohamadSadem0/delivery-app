<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Order\Models\Order;
use App\Domain\Order\Services\OrderStateMachine;
use Illuminate\Http\Request;

class OrderStatusController extends Controller
{
    public function __construct(protected OrderStateMachine $sm) {}

    public function update(Request $request, Order $order)
    {
        $data = $request->validate([
            'to' => ['required','string'],
            'reason' => ['nullable','string','max:1000'],
        ]);

        $order = $this->sm->transition($order, $data['to'], $data['reason'] ?? null);

        return response()->json(['message' => 'Status updated', 'order' => $order]);
    }
}

<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\CheckoutRequest;
use App\Domain\Order\Services\CheckoutOrchestrator;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function __construct(protected CheckoutOrchestrator $orchestrator) {}

    public function checkout(CheckoutRequest $request)
    {
        $order = $this->orchestrator->run(
            auth('api')->id(),
            $request->integer('address_id'),
            $request->string('coupon_code')->toString(),
            $request->string('notes')->toString(),
            $request->header('Reservation-Token') ?: null
        );

        return response()->json(['message' => 'Order created. Proceed to payment.', 'order' => $order], 201);
    }
}

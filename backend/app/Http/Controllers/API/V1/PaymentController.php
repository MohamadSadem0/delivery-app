<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Payment\CreateIntentRequest;
use App\Http\Resources\Payment\PaymentResource;
use App\Domain\Order\Models\Order;
use App\Domain\Payment\Models\Payment;
use App\Services\Integrations\Payments\StripeGateway;
use App\Services\Integrations\Payments\HyperPayGateway;
use App\Services\Integrations\Payments\TapGateway;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function createIntent(CreateIntentRequest $request)
    {
        $data = $request->validated();
        $order = Order::where('user_id', auth('api')->id())->findOrFail($data['order_id']);
        $provider = $data['provider'] ?? config('payment.provider');

        switch ($provider) {
            case 'hyperpay':
                $gateway = new HyperPayGateway();
                break;
            case 'tap':
                $gateway = new TapGateway();
                break;
            default:
                $gateway = new StripeGateway();
        }

        $intent = $gateway->createIntent($order);

        $payment = Payment::create([
            'order_id' => $order->id,
            'provider' => $provider,
            'amount' => $order->total,
            'currency' => $order->currency ?? 'LBP',
            'status' => 'pending',
            'payload' => $intent,
        ]);

        return new PaymentResource($payment);
    }

    public function webhook(Request $request)
    {
        $provider = $request->input('provider', config('payment.provider'));
        $payload = $request->all();

        switch ($provider) {
            case 'hyperpay':
                $gateway = new HyperPayGateway();
                break;
            case 'tap':
                $gateway = new TapGateway();
                break;
            default:
                $gateway = new StripeGateway();
        }

        $result = $gateway->handleWebhook($payload);

        if (!empty($payload['order_id'])) {
            $payment = Payment::where('order_id', $payload['order_id'])->latest()->first();
            if ($payment) {
                $payment->status = $result['status'];
                $payment->provider_payment_id = $result['provider_payment_id'] ?? null;
                $payment->save();
            }
        }

        return response()->json(['message' => 'Webhook processed']);
    }
}

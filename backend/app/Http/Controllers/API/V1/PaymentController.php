<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Payment\CreateIntentRequest;
use App\Http\Resources\Payment\PaymentResource;
use App\Domain\Order\Models\Order;
use App\Domain\Payment\Models\Payment;
use App\Domain\Payment\Services\PaymentRetryService;
use App\Services\Integrations\Payments\StripeGateway;
use App\Services\Integrations\Payments\HyperPayGateway;
use App\Services\Integrations\Payments\TapGateway;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function __construct()
    {
        // ensure all responses for mutating endpoints can be replayed safely
        $this->middleware('idempotency')->only('createIntent');
    }

    public function createIntent(CreateIntentRequest $request, PaymentRetryService $retries)
    {
        $data   = $request->validated();
        $order  = Order::where('user_id', auth('api')->id())->findOrFail($data['order_id']);
        $provider = $data['provider'] ?? config('payment.provider');

        // Enforce simple retry policy per order (e.g., max 3 attempts)
        if ($retries->exceededLimit($order->id, 3)) {
            return response()->json(['message' => 'Max payment attempts reached'], 429);
        }

        // Start a tracked attempt (ties into Idempotency-Key if provided)
        $attempt = $retries->beginAttempt($order->id, $request->header('Idempotency-Key'));

        $gateway = match ($provider) {
            'hyperpay' => new HyperPayGateway(),
            'tap'      => new TapGateway(),
            default    => new StripeGateway(),
        };

        $intent = $gateway->createIntent($order);

        // Persist/append latest Payment row
        $payment = Payment::create([
            'order_id'            => $order->id,
            'provider'            => $provider,
            'provider_payment_id' => $intent['provider_payment_id'] ?? null,
            'amount'              => $order->total,
            'currency'            => $order->currency ?? 'LBP',
            'status'              => 'pending',
            'payload'             => $intent,
        ]);

        // Mark the attempt as pending + stash gateway data
        $retries->completeAttempt($attempt, 'pending', [
            'payment_id' => $payment->id,
            'provider_payment_id' => $payment->provider_payment_id,
        ]);

        return (new PaymentResource($payment))
            ->additional(['attempt_no' => $attempt->attempt_no]);
    }

    public function webhook(Request $request)
    {
        // IMPORTANT: protect this route with middleware('verify.payment.webhook')
        // so only valid signed webhooks pass through.

        $provider = $request->input('provider', config('payment.provider'));
        $payload  = $request->all();

        $gateway = match ($provider) {
            'hyperpay' => new HyperPayGateway(),
            'tap'      => new TapGateway(),
            default    => new StripeGateway(),
        };

        $result = $gateway->handleWebhook($payload);
        // $result => ['status' => 'succeeded|failed|canceled|pending', 'provider_payment_id' => '...']

        if (!empty($payload['order_id'])) {
            DB::transaction(function () use ($payload, $result) {
                /** @var \App\Domain\Payment\Models\Payment|null $payment */
                $payment = Payment::where('order_id', $payload['order_id'])->latest()->first();

                if ($payment) {
                    $payment->status = $result['status'];
                    $payment->provider_payment_id = $result['provider_payment_id'] ?? $payment->provider_payment_id;
                    $payment->save();
                }

                /** @var \App\Domain\Order\Models\Order|null $order */
                $order = Order::find($payload['order_id']);
                if ($order) {
                    // Simple state machine: mark paid on succeeded
                    if (($result['status'] ?? null) === 'succeeded' && $order->status === 'pending_payment') {
                        $order->status = 'paid';
                        $order->save();

                        // Optionally dispatch your existing event:
                        // event(new \App\Events\OrderStatusUpdated($order));
                    }

                    if (($result['status'] ?? null) === 'failed' && $order->status === 'pending_payment') {
                        $order->status = 'payment_failed';
                        $order->save();
                    }
                }
            });
        }

        return response()->json(['message' => 'Webhook processed']);
    }
}

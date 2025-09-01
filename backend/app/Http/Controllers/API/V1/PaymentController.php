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
        $data     = $request->validated();
        $order    = Order::where('user_id', auth('api')->id())->findOrFail($data['order_id']);
        $provider = $data['provider'] ?? config('payments.default_provider', 'stripe');

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

        // Normalize provider payment ID for persistence
        $providerPaymentId = $intent['provider_payment_id']
            ?? $intent['checkout_id']
            ?? $intent['tap_transaction_id']
            ?? $intent['payment_intent']    // if your Stripe gateway returns it later
            ?? null;

        // Persist latest Payment row
        $payment = Payment::create([
            'order_id'            => $order->id,
            'provider'            => $provider,
            'provider_payment_id' => $providerPaymentId,
            'amount'              => $order->total,
            'currency'            => $order->currency ?? 'LBP',
            'status'              => 'pending',
            'payload'             => $intent, // keep full gateway payload for the client
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
        // NOTE: route is protected by middleware('verify.payment.webhook')
        $payload  = $request->json()->all();
        $provider = strtolower((string) ($request->header('X-Payment-Provider') ?? ($payload['provider'] ?? '')));

        $gateway = match ($provider) {
            'stripe'   => new StripeGateway(),
            'tap'      => new TapGateway(),
            'hyperpay' => new HyperPayGateway(),
            default    => null,
        };
        if (!$gateway) {
            return response()->json(['message' => 'Unknown provider'], 400);
        }

        // Normalize provider response (status, provider_payment_id, raw?)
        $normalized = $gateway->handleWebhook($payload);

        // Resolve order id from common places (metadata preferred)
        $orderId = $payload['metadata']['order_id']
            ?? $payload['order_id']
            ?? ($payload['order']['id'] ?? null);

        if ($orderId) {
            DB::transaction(function () use ($orderId, $provider, $normalized, $payload) {
                /** @var \App\Domain\Order\Models\Order|null $order */
                $order = Order::find($orderId);
                if (!$order) return;

                /** @var \App\Domain\Payment\Models\Payment $payment */
                $payment = Payment::firstOrCreate(
                    [
                        'provider'            => $provider,
                        'provider_payment_id' => $normalized['provider_payment_id'] ?? null,
                        'order_id'            => $order->id,
                    ],
                    [
                        'amount'   => $order->total,
                        'currency' => $order->currency ?? 'LBP',
                    ]
                );

                $payment->status = (string) ($normalized['status'] ?? 'processing');
                // prefer a dedicated meta column if your Payment model has it; fallback to payload
                if (property_exists($payment, 'meta')) {
                    $payment->meta = ['raw' => $normalized['raw'] ?? $payload];
                } else {
                    $payment->payload = ['raw' => $normalized['raw'] ?? $payload];
                }
                $payment->save();

                if (in_array($payment->status, ['succeeded','paid','captured'], true)) {
                    // mark order paid once, then settle vendors once
                    if ($order->status !== 'paid') {
                        $order->status = 'paid';
                        $order->save();
                        app(\App\Domain\Finance\Services\SettlementService::class)->settlePaidOrder($order);
                    }
                }

                if ($payment->status === 'failed' && $order->status === 'pending_payment') {
                    $order->status = 'payment_failed';
                    $order->save();
                }
            });
        }

        return response()->json(['ok' => true]);
    }
}

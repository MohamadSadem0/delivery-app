<?php

namespace App\Http\Controllers\API\V1\Webhooks;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use App\Domain\Payment\Services\ProviderWebhookService;

class PaymentWebhookController extends Controller
{
    public function __construct(protected ProviderWebhookService $service) {}

    public function handle(Request $request, string $provider)
    {
        $provider = strtolower($provider);

        // raw JSON
        $event = $request->json()->all();
        $requestId = $request->headers->get('X-Request-Id');

        try {
            $this->service->handle($provider, $event);
            Log::channel('webhooks')->info('Webhook processed', [
                'provider'   => $provider,
                'request_id' => $requestId,
            ]);
            return response()->json(['ok' => true]);
        } catch (\Throwable $e) {
            Log::channel('webhooks')->error('Webhook failed', [
                'provider'   => $provider,
                'request_id' => $requestId,
                'error'      => $e->getMessage(),
                'trace'      => substr($e->getTraceAsString(), 0, 2000),
            ]);
            return response()->json(['message' => 'Webhook processing failed'], 500);
        }
    }
}

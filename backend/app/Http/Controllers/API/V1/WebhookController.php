<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Security\Services\SuspiciousActivityService;
use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function fail(Request $request, SuspiciousActivityService $logger)
    {
        $logger->log(null, 'webhook_invalid_signature', ['headers' => $request->headers->all()]);
        return response()->json(['message' => 'Logged suspicious webhook'], 200);
    }
}

<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    protected function success($data = null, string $message = 'OK', int $code = 200): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    protected function fail(string $message = 'Error', array $errors = [], int $code = 422): JsonResponse
    {
        $payload = ['message' => $message];
        if (!empty($errors)) $payload['errors'] = $errors;
        return response()->json($payload, $code);
    }
}

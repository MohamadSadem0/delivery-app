<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class Idempotency
{
    public function handle(Request $request, Closure $next)
    {
        // Only for mutating requests
        if (!in_array($request->method(), ['POST','PUT','PATCH','DELETE'], true)) {
            return $next($request);
        }

        if (config('idempotency.disabled', false)) {
            return $next($request);
        }

        $key = $this->extractKey($request);
        if ($key === null) {
            return response()->json(['message' => 'Missing Idempotency-Key'], 400);
        }

        $userId  = optional($request->user('api'))->getAuthIdentifier() ?? 'guest';
        $scope   = strtoupper($request->method()) . ' ' . $request->path();
        $cacheKey = $this->cacheKey($key, $userId, $scope);
        $fp      = $this->fingerprint($request);

        $store   = Cache::store(config('idempotency.cache', null));
        $ttl     = (int) config('idempotency.ttl', 24 * 60 * 60);
        $lockTtl = (int) config('idempotency.lock_ttl', 30);
        $lockWait= (int) config('idempotency.lock_wait', 10);

        // Fast path: previously cached response
        if ($record = $store->get($cacheKey)) {
            if (!hash_equals((string) ($record['fp'] ?? ''), $fp)) {
                return response()->json([
                    'message' => 'Idempotency-Key already used for a different request',
                    'hint'    => 'Use a new Idempotency-Key for a changed payload.',
                ], 409)->withHeaders([
                    'Idempotency-Key' => $key,
                    'Idempotent-Replay' => 'true',
                ]);
            }
            return $this->replayResponse($record, $key);
        }

        // Driver-agnostic mutex using Cache::add()
        $lockKey  = $cacheKey . ':lock';
        $owner    = bin2hex(random_bytes(8));
        $deadline = microtime(true) + $lockWait;
        $locked   = false;

        while (microtime(true) < $deadline) {
            // add() succeeds only if key does not exist
            if ($store->add($lockKey, $owner, $lockTtl)) {
                $locked = true;
                break;
            }
            usleep(200_000); // 200ms backoff
        }

        if (!$locked) {
            return response()->json(['message' => 'Request is already being processed'], 409)->withHeaders([
                'Idempotency-Key' => $key,
                'Retry-After' => (string) max(1, (int) ($lockTtl / 2)),
            ]);
        }

        try {
            // Double-check after acquiring lock: another process might have finished while we waited
            if ($record = $store->get($cacheKey)) {
                if (!hash_equals((string) ($record['fp'] ?? ''), $fp)) {
                    return response()->json([
                        'message' => 'Idempotency-Key already used for a different request',
                        'hint'    => 'Use a new Idempotency-Key for a changed payload.',
                    ], 409)->withHeaders([
                        'Idempotency-Key' => $key,
                        'Idempotent-Replay' => 'true',
                    ]);
                }
                return $this->replayResponse($record, $key);
            }

            /** @var \Symfony\Component\HttpFoundation\Response $response */
            $response = $next($request);

            // Skip caching for streamed/binary responses
            if ($response instanceof StreamedResponse || $response instanceof BinaryFileResponse) {
                $response->headers->set('Idempotency-Key', $key);
                $response->headers->set('Idempotent-Replay', 'false');
                return $response;
            }

            $status  = $response->getStatusCode();
            $cacheOn = (array) config('idempotency.cache_statuses', [200,201,202,204,400,401,403,404,409,422]);

            if (in_array($status, $cacheOn, true)) {
                $record = [
                    'status' => $status,
                    'headers' => $response->headers->all(),
                    'body' => $response->getContent(),
                    'fp' => $fp,
                    'user' => $userId,
                    'scope' => $scope,
                    'key' => $key,
                    'stored_at' => now()->toIso8601String(),
                ];
                $store->put($cacheKey, $record, $ttl);
            }

            $response->headers->set('Idempotency-Key', $key);
            $response->headers->set('Idempotent-Replay', 'false');
            return $response;

        } finally {
            // Release mutex only if we own it
            $current = $store->get($lockKey);
            if ($locked && $current === $owner) {
                $store->forget($lockKey);
            }
        }
    }

    private function extractKey(Request $request): ?string
    {
        $key = $request->header('Idempotency-Key')
            ?? $request->header('X-Idempotency-Key')
            ?? $request->input('idempotency_key');

        $key = is_string($key) ? trim($key) : null;
        return $key !== '' ? $key : null;
    }

    private function cacheKey(string $key, string $userId, string $scope): string
    {
        return 'idem:' . hash('sha256', implode('|', [
            app()->environment(), $userId, $scope, $key
        ]));
    }

    private function fingerprint(Request $request): string
    {
        $raw = (string) $request->getContent();
        $ctype = strtolower($request->header('Content-Type', ''));
        return hash('sha256', $ctype . '|' . $raw);
    }

    private function replayResponse(array $record, string $key)
    {
        $resp = new Response(
            $record['body'] ?? '',
            (int) ($record['status'] ?? 200),
            (array) ($record['headers'] ?? [])
        );
        $resp->headers->set('Idempotency-Key', $key);
        $resp->headers->set('Idempotent-Replay', 'true');
        return $resp;
    }
}

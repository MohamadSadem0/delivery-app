<?php

use App\Domain\Payment\Services\PaymentRetryService;

it('tracks payment attempts and enforces max', function () {
    $retries = app(PaymentRetryService::class);
    $orderId = 123;

    $a1 = $retries->beginAttempt($orderId, 'k1');
    $retries->completeAttempt($a1, 'failed');

    $a2 = $retries->beginAttempt($orderId, 'k2');
    $retries->completeAttempt($a2, 'failed');

    $a3 = $retries->beginAttempt($orderId, 'k3');
    $retries->completeAttempt($a3, 'failed');

    expect($retries->exceededLimit($orderId, 3))->toBeTrue();
});

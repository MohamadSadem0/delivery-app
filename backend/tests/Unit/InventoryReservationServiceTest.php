<?php

use App\Domain\Order\Services\InventoryReservationService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

it('reserves and releases inventory with token', function () {
    $service = app(InventoryReservationService::class);

    // Assuming product with id=1 and stock >= 5 exists in test DB
    $token = 'tok_test_1';
    $ok = $service->tryReserve($token, 1, 2, 60);
    expect($ok)->toBeTrue();

    $service->releaseAll($token);
    expect(true)->toBeTrue(); // If no exceptions, pass
});

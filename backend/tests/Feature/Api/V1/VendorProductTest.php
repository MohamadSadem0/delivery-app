<?php

use App\Domain\User\Models\User;
use App\Domain\Store\Models\Store;
use Tymon\JWTAuth\Facades\JWTAuth;

it('vendor can CRUD products', function () {
    $vendor = User::factory()->create(['role' => 'vendor']);
    Store::factory()->create(['user_id' => $vendor->id]);
    $token = JWTAuth::fromUser($vendor);

    $this->withHeader('Authorization', "Bearer $token");

    $resp = $this->postJson('/api/v1/vendor/products', [
        'name' => 'Vendor Item',
        'category_id' => 1,
        'price' => 10000,
        'stock' => 5
    ])->assertCreated();

    $id = $resp['data']['id'] ?? $resp['id'];

    $this->patchJson("/api/v1/vendor/products/$id", ['stock' => 10])->assertOk();
    $this->deleteJson("/api/v1/vendor/products/$id")->assertOk();
});

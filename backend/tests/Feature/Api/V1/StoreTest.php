<?php

use App\Domain\Store\Models\Store;

it('lists and shows stores', function () {
    Store::factory()->create(['name' => 'Lebanon Shop','is_active' => true]);

    $this->getJson('/api/v1/stores')->assertOk()->assertJsonStructure(['data']);
    $this->getJson('/api/v1/stores/1')->assertOk()->assertJsonStructure(['id','name']);
});

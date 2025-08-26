<?php

test('user can register and login with JWT', function () {
    $resp = $this->postJson('/api/v1/auth/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $resp->assertStatus(201)->assertJsonStructure(['access_token']);

    $login = $this->postJson('/api/v1/auth/login', [
        'email' => 'test@example.com',
        'password' => 'password',
    ]);

    $login->assertStatus(200)->assertJsonStructure(['access_token']);
});

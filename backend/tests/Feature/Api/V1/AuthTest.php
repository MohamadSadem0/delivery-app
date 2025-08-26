<?php

use App\Domain\User\Models\User;
use Illuminate\Support\Facades\Hash;

it('registers and logs in a user via JWT', function () {
    $email = 'user'.uniqid().'@example.com';

    $register = $this->postJson('/api/v1/auth/register', [
        'name' => 'Test User',
        'email' => $email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertCreated()->json();

    expect($register['access_token'])->toBeString();

    $login = $this->postJson('/api/v1/auth/login', [
        'email' => $email,
        'password' => 'password',
    ])->assertOk()->json();

    expect($login['access_token'])->toBeString();
});

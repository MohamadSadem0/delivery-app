<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema; // ← add this
use App\Domain\User\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $payload = [
            'name'     => 'Super Admin',
            'email'    => 'admin@example.com',
            'password' => Hash::make('P@ssw0rd123!'),
        ];

        if (Schema::hasColumn('users', 'role')) {
            $payload['role'] = 'admin';
        }
        if (Schema::hasColumn('users', 'country_code')) {
            $payload['country_code'] = 'LB';
        }

        User::firstOrCreate(['email' => $payload['email']], $payload);
    }
}

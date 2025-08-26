<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();
                $table->string('password');
                $table->enum('role', ['CUSTOMER','VENDOR','DELIVERY','ADMIN'])->default('CUSTOMER');
                $table->rememberToken();
                $table->timestamps();
            });
        } else {
            Schema::table('users', function (Blueprint $table) {
                if (!Schema::hasColumn('users','role')) {
                    $table->enum('role', ['CUSTOMER','VENDOR','DELIVERY','ADMIN'])->default('CUSTOMER')->after('password');
                }
            });
        }
    }

    public function down(): void
    {
        // We don't drop users in down() to avoid data loss; if created by this migration, you can drop manually.
    }
};

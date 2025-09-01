<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'driver_status')) {
                $table->string('driver_status', 10)->default('OFFLINE')->after('remember_token');
            }
            if (!Schema::hasColumn('users', 'last_lat')) {
                $table->decimal('last_lat', 10, 7)->nullable()->after('driver_status');
            }
            if (!Schema::hasColumn('users', 'last_lng')) {
                $table->decimal('last_lng', 10, 7)->nullable()->after('last_lat');
            }
            if (!Schema::hasColumn('users', 'last_loc_at')) {
                $table->timestamp('last_loc_at')->nullable()->after('last_lng');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            foreach (['driver_status','last_lat','last_lng','last_loc_at'] as $col) {
                if (Schema::hasColumn('users', $col)) { $table->dropColumn($col); }
            }
        });
    }
};

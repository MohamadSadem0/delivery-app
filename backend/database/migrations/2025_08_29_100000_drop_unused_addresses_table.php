<?php
// database/migrations/2025_08_29_100000_drop_unused_addresses_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Only drop if YOUR real addresses table exists elsewhere
        if (Schema::hasTable('addresses') && Schema::hasTable('user_addresses')) {
            Schema::dropIfExists('addresses');
        }
    }
    public function down(): void
    {
        // no-op: do not recreate unused table
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('stores') || !Schema::hasColumn('stores', 'geo_point')) {
            return;
        }

        // If your MySQL column is a spatial POINT, raw SQL is the most reliable:
        try {
            DB::statement("ALTER TABLE `stores` MODIFY `geo_point` POINT NULL");
        } catch (\Throwable $e) {
            // If your column isn't spatial (e.g., VARCHAR/JSON), fall back to a generic NULL change
            try {
                DB::statement("ALTER TABLE `stores` MODIFY `geo_point` NULL");
            } catch (\Throwable $ignored) {}
        }
    }

    public function down(): void
    {
        // No-op: we won't force it back to NOT NULL
    }
};

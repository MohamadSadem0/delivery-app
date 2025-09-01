<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('stores') || !Schema::hasColumn('stores', 'type')) {
            return;
        }

        // Backfill from section if possible before making it nullable
        try {
            DB::statement("
                UPDATE stores s
                JOIN sections sec ON sec.id = s.section_id
                SET s.type = sec.slug
                WHERE s.type IS NULL OR s.type = ''
            ");
        } catch (\Throwable $e) {
            // ignore if join/columns differ
        }

        // Make column nullable (MySQL)
        try {
            DB::statement("ALTER TABLE `stores` MODIFY `type` VARCHAR(50) NULL");
        } catch (\Throwable $e) {
            // If Doctrine DBAL is installed, you could use Schema::table + $table->string()->nullable()->change();
            // Raw SQL above works fine on MySQL.
        }
    }

    public function down(): void
    {
        // No-op (we won’t force it back to NOT NULL)
    }
};

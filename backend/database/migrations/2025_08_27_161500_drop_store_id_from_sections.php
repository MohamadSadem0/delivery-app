<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('sections')) {
            return;
        }

        // If legacy store_id exists, drop FK & indexes, then drop the column
        if (Schema::hasColumn('sections', 'store_id')) {
            // Drop FK (name varies per environment)
            $fkName = DB::table('information_schema.KEY_COLUMN_USAGE')
                ->whereRaw('TABLE_SCHEMA = DATABASE()')
                ->where('TABLE_NAME', 'sections')
                ->where('COLUMN_NAME', 'store_id')
                ->whereNotNull('REFERENCED_TABLE_NAME')
                ->value('CONSTRAINT_NAME');

            if ($fkName) {
                DB::statement("ALTER TABLE `sections` DROP FOREIGN KEY `{$fkName}`");
            }

            // Drop any indexes on store_id (non-primary)
            $idxNames = DB::table('information_schema.STATISTICS')
                ->whereRaw('TABLE_SCHEMA = DATABASE()')
                ->where('TABLE_NAME', 'sections')
                ->where('COLUMN_NAME', 'store_id')
                ->pluck('INDEX_NAME')
                ->unique()
                ->toArray();

            foreach ($idxNames as $idx) {
                if ($idx && $idx !== 'PRIMARY') {
                    DB::statement("ALTER TABLE `sections` DROP INDEX `{$idx}`");
                }
            }

            // Finally drop the column
            Schema::table('sections', function (Blueprint $table) {
                $table->dropColumn('store_id');
            });
        }

        // Ensure required columns for global sections
        Schema::table('sections', function (Blueprint $table) {
            if (!Schema::hasColumn('sections', 'slug')) {
                $table->string('slug')->nullable();
            }
            if (!Schema::hasColumn('sections', 'name')) {
                $table->string('name')->nullable();
            }
            if (!Schema::hasColumn('sections', 'is_active')) {
                $table->boolean('is_active')->default(true);
            }
        });

        // Backfill slug from name if needed
        if (Schema::hasColumn('sections', 'slug') && Schema::hasColumn('sections', 'name')) {
            DB::statement("
                UPDATE sections
                SET slug = LOWER(REPLACE(TRIM(name), ' ', '-'))
                WHERE (slug IS NULL OR slug = '') AND name IS NOT NULL
            ");
        }

        // Ensure a unique index on slug (best effort)
        $slugIndexExists = DB::table('information_schema.STATISTICS')
            ->whereRaw('TABLE_SCHEMA = DATABASE()')
            ->where('TABLE_NAME', 'sections')
            ->where('INDEX_NAME', 'sections_slug_unique')
            ->exists();

        if (!$slugIndexExists && Schema::hasColumn('sections', 'slug')) {
            try {
                DB::statement('ALTER TABLE `sections` ADD UNIQUE KEY `sections_slug_unique` (`slug`)');
            } catch (\Throwable $e) {
                // if dupes exist, leave non-unique; seed will still work
            }
        }
    }

    public function down(): void
    {
        // Non-destructive: we won't recreate legacy store_id
        try { DB::statement('ALTER TABLE `sections` DROP INDEX `sections_slug_unique`'); } catch (\Throwable $e) {}
    }
};

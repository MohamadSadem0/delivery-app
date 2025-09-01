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
            // If the table truly doesn't exist, create it properly
            Schema::create('sections', function (Blueprint $table) {
                $table->id();
                $table->string('slug')->unique();
                $table->string('name');
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
            return;
        }

        // Table exists: add missing columns safely
        Schema::table('sections', function (Blueprint $table) {
            if (!Schema::hasColumn('sections', 'slug')) {
                $table->string('slug')->nullable(); // make it first nullable, fill, then make unique
            }
            if (!Schema::hasColumn('sections', 'name')) {
                $table->string('name')->nullable();
            }
            if (!Schema::hasColumn('sections', 'is_active')) {
                $table->boolean('is_active')->default(true);
            }
        });

        // Backfill slug from name where possible
        if (Schema::hasColumn('sections', 'slug') && Schema::hasColumn('sections', 'name')) {
            // simple slugify: lower + replace spaces with dashes
            DB::statement("
                UPDATE sections
                SET slug = LOWER(REPLACE(TRIM(name), ' ', '-'))
                WHERE (slug IS NULL OR slug = '') AND name IS NOT NULL
            ");
        }

        // Add unique index on slug if not exists
        $slugIndexExists = DB::table('information_schema.STATISTICS')
            ->whereRaw('TABLE_SCHEMA = DATABASE()')
            ->where('TABLE_NAME', 'sections')
            ->where('INDEX_NAME', 'sections_slug_unique')
            ->exists();

        if (!$slugIndexExists && Schema::hasColumn('sections', 'slug')) {
            try {
                DB::statement('ALTER TABLE `sections` ADD UNIQUE KEY `sections_slug_unique` (`slug`)');
            } catch (\Throwable $e) {
                // if dupes/nulls exist, keep it non-unique until cleaned; not fatal for seeding
            }
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('sections')) {
            try { DB::statement('ALTER TABLE `sections` DROP INDEX `sections_slug_unique`'); } catch (\Throwable $e) {}
            // keep columns; non-destructive down
        }
    }
};

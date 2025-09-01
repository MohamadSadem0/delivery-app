<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('categories')) {
            return;
        }

        Schema::table('categories', function (Blueprint $table) {
            if (!Schema::hasColumn('categories', 'name')) {
                $table->string('name')->nullable();
            }
            if (!Schema::hasColumn('categories', 'slug')) {
                $table->string('slug')->nullable();
            }
            if (!Schema::hasColumn('categories', 'is_active')) {
                $table->boolean('is_active')->default(true)->index();
            }
            if (!Schema::hasColumn('categories', 'section_id')) {
                $table->unsignedBigInteger('section_id')->nullable();
            }
        });

        // Index on section_id (only if missing)
        if (Schema::hasColumn('categories', 'section_id')) {
            $hasIdx = DB::table('information_schema.STATISTICS')
                ->whereRaw('TABLE_SCHEMA = DATABASE()')
                ->where('TABLE_NAME', 'categories')
                ->where('INDEX_NAME', 'categories_section_id_idx')
                ->exists();
            if (!$hasIdx) {
                DB::statement('ALTER TABLE `categories` ADD INDEX `categories_section_id_idx` (`section_id`)');
            }

            // FK to sections (only if missing)
            $hasFk = DB::table('information_schema.KEY_COLUMN_USAGE')
                ->whereRaw('TABLE_SCHEMA = DATABASE()')
                ->where('TABLE_NAME', 'categories')
                ->where('COLUMN_NAME', 'section_id')
                ->whereNotNull('REFERENCED_TABLE_NAME')
                ->exists();
            if (!$hasFk) {
                DB::statement('ALTER TABLE `categories` ADD CONSTRAINT `categories_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE SET NULL');
            }
        }

        // Unique (section_id, slug) (drop old unique on slug if needed)
        $hasComposite = DB::table('information_schema.STATISTICS')
            ->whereRaw('TABLE_SCHEMA = DATABASE()')
            ->where('TABLE_NAME', 'categories')
            ->where('INDEX_NAME', 'categories_section_slug_unique')
            ->exists();

        if (!$hasComposite && Schema::hasColumn('categories', 'section_id') && Schema::hasColumn('categories', 'slug')) {
            try { DB::statement('ALTER TABLE `categories` DROP INDEX `categories_slug_unique`'); } catch (\Throwable $e) {}
            try { DB::statement('ALTER TABLE `categories` ADD UNIQUE KEY `categories_section_slug_unique` (`section_id`,`slug`)'); } catch (\Throwable $e) {}
        }
    }

    public function down(): void
    {
        if (!Schema::hasTable('categories')) return;

        try { DB::statement('ALTER TABLE `categories` DROP INDEX `categories_section_slug_unique`'); } catch (\Throwable $e) {}
        // keep added columns; non-destructive down
    }
};

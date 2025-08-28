<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 0) Ensure sections table exists
        if (!Schema::hasTable('sections')) {
            Schema::create('sections', function (Blueprint $table) {
                $table->id();
                $table->string('slug')->unique();
                $table->string('name');
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // 1) STORES
        if (Schema::hasTable('stores')) {
            // Add user_id if missing
            Schema::table('stores', function (Blueprint $table) {
                if (!Schema::hasColumn('stores', 'user_id')) {
                    $table->unsignedBigInteger('user_id')->nullable();
                }
            });

            // Backfill user_id from owner_user_id if present
            if (Schema::hasColumn('stores', 'owner_user_id') && Schema::hasColumn('stores', 'user_id')) {
                DB::statement('UPDATE stores SET user_id = owner_user_id WHERE user_id IS NULL');
            }

            // Ensure is_active exists
            Schema::table('stores', function (Blueprint $table) {
                if (!Schema::hasColumn('stores', 'is_active')) {
                    $table->boolean('is_active')->default(true);
                }
            });

            // Drop FK / index on owner_user_id if present (names vary)
            if (Schema::hasColumn('stores', 'owner_user_id')) {
                $fkName = DB::table('information_schema.KEY_COLUMN_USAGE')
                    ->whereRaw('TABLE_SCHEMA = DATABASE()')
                    ->where('TABLE_NAME', 'stores')
                    ->where('COLUMN_NAME', 'owner_user_id')
                    ->whereNotNull('REFERENCED_TABLE_NAME')
                    ->value('CONSTRAINT_NAME');

                if ($fkName) {
                    DB::statement("ALTER TABLE `stores` DROP FOREIGN KEY `{$fkName}`");
                }

                $idxNames = DB::table('information_schema.STATISTICS')
                    ->whereRaw('TABLE_SCHEMA = DATABASE()')
                    ->where('TABLE_NAME', 'stores')
                    ->where('COLUMN_NAME', 'owner_user_id')
                    ->pluck('INDEX_NAME')->unique()->toArray();

                foreach ($idxNames as $idx) {
                    if ($idx && $idx !== 'PRIMARY') {
                        DB::statement("ALTER TABLE `stores` DROP INDEX `{$idx}`");
                    }
                }
            }

            // Ensure columns
            Schema::table('stores', function (Blueprint $table) {
                if (!Schema::hasColumn('stores', 'slug')) {
                    $table->string('slug')->nullable();
                }
                if (!Schema::hasColumn('stores', 'supports_delivery')) {
                    $table->boolean('supports_delivery')->default(true);
                }
                if (!Schema::hasColumn('stores', 'supports_pickup')) {
                    $table->boolean('supports_pickup')->default(false);
                }
                if (!Schema::hasColumn('stores', 'supports_shipping')) {
                    $table->boolean('supports_shipping')->default(false);
                }
                if (!Schema::hasColumn('stores', 'commission_rate_bps')) {
                    $table->unsignedInteger('commission_rate_bps')->default(1000);
                }
                if (!Schema::hasColumn('stores', 'section_id')) {
                    $table->unsignedBigInteger('section_id')->nullable();
                }
            });

            // Add indexes ONLY if missing (avoid duplicate key errors)
            $hasUserIdx = DB::table('information_schema.STATISTICS')
                ->whereRaw('TABLE_SCHEMA = DATABASE()')
                ->where('TABLE_NAME', 'stores')
                ->where('INDEX_NAME', 'stores_user_id_idx')
                ->exists();
            if (!$hasUserIdx && Schema::hasColumn('stores','user_id')) {
                DB::statement('ALTER TABLE `stores` ADD INDEX `stores_user_id_idx` (`user_id`)');
            }

            $hasSectionIdx = DB::table('information_schema.STATISTICS')
                ->whereRaw('TABLE_SCHEMA = DATABASE()')
                ->where('TABLE_NAME', 'stores')
                ->where('INDEX_NAME', 'stores_section_id_idx')
                ->exists();
            if (!$hasSectionIdx && Schema::hasColumn('stores','section_id')) {
                DB::statement('ALTER TABLE `stores` ADD INDEX `stores_section_id_idx` (`section_id`)');
            }

            // Add FKs ONLY if missing
            $userFkExists = DB::table('information_schema.KEY_COLUMN_USAGE')
                ->whereRaw('TABLE_SCHEMA = DATABASE()')
                ->where('TABLE_NAME', 'stores')
                ->where('COLUMN_NAME', 'user_id')
                ->whereNotNull('REFERENCED_TABLE_NAME')
                ->exists();
            if (!$userFkExists && Schema::hasColumn('stores','user_id')) {
                DB::statement('ALTER TABLE `stores` ADD CONSTRAINT `stores_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE');
            }

            $sectionFkExists = DB::table('information_schema.KEY_COLUMN_USAGE')
                ->whereRaw('TABLE_SCHEMA = DATABASE()')
                ->where('TABLE_NAME', 'stores')
                ->where('COLUMN_NAME', 'section_id')
                ->whereNotNull('REFERENCED_TABLE_NAME')
                ->exists();
            if (!$sectionFkExists && Schema::hasColumn('stores','section_id')) {
                DB::statement('ALTER TABLE `stores` ADD CONSTRAINT `stores_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE SET NULL');
            }

            // Unique (user_id, slug) only if it doesn't already exist
            $compositeExists = DB::table('information_schema.STATISTICS')
                ->whereRaw('TABLE_SCHEMA = DATABASE()')
                ->where('TABLE_NAME', 'stores')
                ->where('INDEX_NAME', 'stores_user_slug_unique')
                ->exists();
            if (!$compositeExists && Schema::hasColumn('stores','user_id') && Schema::hasColumn('stores','slug')) {
                try {
                    DB::statement('ALTER TABLE `stores` ADD UNIQUE KEY `stores_user_slug_unique` (`user_id`,`slug`)');
                } catch (\Throwable $e) { /* ignore if dupes; fix data then rerun if needed */ }
            }

            // Drop old column
            if (Schema::hasColumn('stores', 'owner_user_id')) {
                Schema::table('stores', function (Blueprint $table) {
                    $table->dropColumn('owner_user_id');
                });
            }
        }

        // 2) CATEGORIES
        // 2) CATEGORIES (defensive: your table has no parent_id)
if (Schema::hasTable('categories')) {
    // Add section_id if missing (no "after" clause)
    Schema::table('categories', function (Blueprint $table) {
        if (!Schema::hasColumn('categories', 'section_id')) {
            $table->unsignedBigInteger('section_id')->nullable();
        }
    });

    // Index section_id if missing
    $catSectionIdx = DB::table('information_schema.STATISTICS')
        ->whereRaw('TABLE_SCHEMA = DATABASE()')
        ->where('TABLE_NAME', 'categories')
        ->where('INDEX_NAME', 'categories_section_id_idx')
        ->exists();
    if (!$catSectionIdx && Schema::hasColumn('categories','section_id')) {
        DB::statement('ALTER TABLE `categories` ADD INDEX `categories_section_id_idx` (`section_id`)');
    }

    // FK if missing
    $catSectionFk = DB::table('information_schema.KEY_COLUMN_USAGE')
        ->whereRaw('TABLE_SCHEMA = DATABASE()')
        ->where('TABLE_NAME', 'categories')
        ->where('COLUMN_NAME', 'section_id')
        ->whereNotNull('REFERENCED_TABLE_NAME')
        ->exists();
    if (!$catSectionFk && Schema::hasColumn('categories','section_id')) {
        DB::statement('ALTER TABLE `categories` ADD CONSTRAINT `categories_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE SET NULL');
    }

    // Unique (section_id, slug) if missing; drop old unique on slug if it exists
    $catComposite = DB::table('information_schema.STATISTICS')
        ->whereRaw('TABLE_SCHEMA = DATABASE()')
        ->where('TABLE_NAME', 'categories')
        ->where('INDEX_NAME', 'categories_section_slug_unique')
        ->exists();

    if (!$catComposite && Schema::hasColumn('categories','section_id') && Schema::hasColumn('categories','slug')) {
        try { DB::statement('ALTER TABLE `categories` DROP INDEX `categories_slug_unique`'); } catch (\Throwable $e) {}
        try { DB::statement('ALTER TABLE `categories` ADD UNIQUE KEY `categories_section_slug_unique` (`section_id`,`slug`)'); } catch (\Throwable $e) {}
    }
}

    }

    public function down(): void
    {
        // CATEGORIES revert
        if (Schema::hasTable('categories')) {
            try { DB::statement('ALTER TABLE `categories` DROP INDEX `categories_section_slug_unique`'); } catch (\Throwable $e) {}
            try { DB::statement('ALTER TABLE `categories` ADD UNIQUE KEY `categories_slug_unique` (`slug`)'); } catch (\Throwable $e) {}

            Schema::table('categories', function (Blueprint $table) {
                if (Schema::hasColumn('categories','section_id')) {
                    try { $table->dropForeign(['section_id']); } catch (\Throwable $e) {}
                    $table->dropColumn('section_id');
                }
            });
        }

        // STORES revert (non-destructive: keep user_id / is_active)
        if (Schema::hasTable('stores')) {
            try { DB::statement('ALTER TABLE `stores` DROP INDEX `stores_user_slug_unique`'); } catch (\Throwable $e) {}

            Schema::table('stores', function (Blueprint $table) {
                foreach (['supports_delivery','supports_pickup','supports_shipping','commission_rate_bps'] as $col) {
                    if (Schema::hasColumn('stores', $col)) $table->dropColumn($col);
                }
                if (Schema::hasColumn('stores','section_id')) {
                    try { $table->dropForeign(['section_id']); } catch (\Throwable $e) {}
                    $table->dropColumn('section_id');
                }
            });
        }

        Schema::dropIfExists('sections');
    }
};

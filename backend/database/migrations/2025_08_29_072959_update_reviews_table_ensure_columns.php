<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (Schema::hasTable('reviews')) {
            Schema::table('reviews', function (Blueprint $table) {
                if (!Schema::hasColumn('reviews', 'rating')) {
                    $table->unsignedTinyInteger('rating')->after('user_id');
                }
                if (!Schema::hasColumn('reviews', 'title')) {
                    $table->string('title', 120)->nullable()->after('rating');
                }
                if (!Schema::hasColumn('reviews', 'body')) {
                    $table->text('body')->nullable()->after('title');
                }
                if (!Schema::hasColumn('reviews', 'status')) {
                    $table->enum('status', ['PENDING','APPROVED','REJECTED'])->default('PENDING')->after('body');
                }
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('reviews')) {
            Schema::table('reviews', function (Blueprint $table) {
                if (Schema::hasColumn('reviews', 'status')) $table->dropColumn('status');
                if (Schema::hasColumn('reviews', 'body')) $table->dropColumn('body');
                if (Schema::hasColumn('reviews', 'title')) $table->dropColumn('title');
                if (Schema::hasColumn('reviews', 'rating')) $table->dropColumn('rating');
            });
        }
    }
};

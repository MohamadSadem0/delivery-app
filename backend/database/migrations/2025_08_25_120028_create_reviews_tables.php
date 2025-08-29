<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // ---------------------------
        // REVIEWS
        // ---------------------------
        if (!Schema::hasTable('reviews')) {
            Schema::create('reviews', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id');
                $table->unsignedBigInteger('store_id')->nullable();
                $table->unsignedBigInteger('product_id')->nullable();
                $table->unsignedTinyInteger('rating');
                $table->text('comment')->nullable();
                $table->string('status')->default('PENDING'); // PENDING, APPROVED, REJECTED
                $table->timestamps();

                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('store_id')->references('id')->on('stores')->nullOnDelete();
                $table->foreign('product_id')->references('id')->on('products')->nullOnDelete();

                $table->index(['store_id','status','created_at'], 'idx_reviews_store_status_time');
            });
        } else {
            // Table exists: add only missing columns (non-destructive)
            Schema::table('reviews', function (Blueprint $table) {
                if (!Schema::hasColumn('reviews', 'user_id')) {
                    $table->unsignedBigInteger('user_id')->after('id');
                }
                if (!Schema::hasColumn('reviews', 'store_id')) {
                    $table->unsignedBigInteger('store_id')->nullable()->after('user_id');
                    // FK creation for existing tables is skipped intentionally to avoid collisions.
                }
                if (!Schema::hasColumn('reviews', 'product_id')) {
                    $table->unsignedBigInteger('product_id')->nullable()->after('store_id');
                }
                if (!Schema::hasColumn('reviews', 'rating')) {
                    $table->unsignedTinyInteger('rating')->after('product_id');
                }
                if (!Schema::hasColumn('reviews', 'comment')) {
                    $table->text('comment')->nullable()->after('rating');
                }
                if (!Schema::hasColumn('reviews', 'status')) {
                    $table->string('status')->default('PENDING')->after('comment');
                }
                if (!Schema::hasColumn('reviews', 'created_at') && !Schema::hasColumn('reviews', 'updated_at')) {
                    $table->timestamps();
                }
                // Index ensure is skipped (no native Schema::hasIndex without DBAL).
            });
        }

        // ---------------------------
        // DELIVERY_REVIEWS
        // ---------------------------
        if (!Schema::hasTable('delivery_reviews')) {
            Schema::create('delivery_reviews', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id');    // reviewer (customer)
                $table->unsignedBigInteger('delivery_id');
                $table->unsignedTinyInteger('rating');
                $table->text('comment')->nullable();
                $table->timestamps();

                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('delivery_id')->references('id')->on('deliveries')->onDelete('cascade');
                $table->unique(['user_id','delivery_id']);
            });
        } else {
            Schema::table('delivery_reviews', function (Blueprint $table) {
                if (!Schema::hasColumn('delivery_reviews', 'user_id')) {
                    $table->unsignedBigInteger('user_id')->after('id');
                }
                if (!Schema::hasColumn('delivery_reviews', 'delivery_id')) {
                    $table->unsignedBigInteger('delivery_id')->after('user_id');
                }
                if (!Schema::hasColumn('delivery_reviews', 'rating')) {
                    $table->unsignedTinyInteger('rating')->after('delivery_id');
                }
                if (!Schema::hasColumn('delivery_reviews', 'comment')) {
                    $table->text('comment')->nullable()->after('rating');
                }
                if (!Schema::hasColumn('delivery_reviews', 'created_at') && !Schema::hasColumn('delivery_reviews', 'updated_at')) {
                    $table->timestamps();
                }
                // Unique index ensure skipped to avoid duplicate-index errors on existing DBs.
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('delivery_reviews');
        Schema::dropIfExists('reviews');
    }
};

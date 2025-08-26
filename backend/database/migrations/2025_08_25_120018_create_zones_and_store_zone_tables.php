<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('zones', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        DB::statement("ALTER TABLE zones ADD COLUMN polygon GEOMETRY NULL AFTER name");

        Schema::create('store_zones', function (Blueprint $table) {
            $table->unsignedBigInteger('store_id');
            $table->unsignedBigInteger('zone_id');
            $table->enum('rule', ['ALLOW','DENY'])->default('ALLOW');
            $table->integer('priority')->default(100);
            $table->primary(['store_id','zone_id']);
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->foreign('zone_id')->references('id')->on('zones')->onDelete('cascade');
            $table->index(['store_id','rule','priority'], 'idx_store_zones_rule');
        });

        Schema::create('store_delivery_settings', function (Blueprint $table) {
            $table->unsignedBigInteger('store_id')->primary();
            $table->boolean('serves_all_zones')->default(false);
            $table->decimal('max_distance_km',6,2)->nullable();
            $table->unsignedBigInteger('default_min_order_cents')->default(0);
            $table->boolean('allow_pickup')->default(true);
            $table->boolean('allow_delivery')->default(true);
            $table->boolean('allow_shipping')->default(false);
            $table->timestamp('updated_at')->nullable();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
        });

        Schema::create('store_zone_overrides', function (Blueprint $table) {
            $table->unsignedBigInteger('store_id');
            $table->unsignedBigInteger('zone_id');
            $table->unsignedBigInteger('min_order_cents')->nullable();
            $table->unsignedInteger('prep_time_minutes')->nullable();
            $table->unsignedBigInteger('delivery_fee_override_cents')->nullable();
            $table->boolean('active')->default(true);
            $table->primary(['store_id','zone_id']);
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->foreign('zone_id')->references('id')->on('zones')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('store_zone_overrides');
        Schema::dropIfExists('store_delivery_settings');
        Schema::dropIfExists('store_zones');
        Schema::dropIfExists('zones');
    }
};

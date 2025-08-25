<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('store_id');
            $table->string('name');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('store_id');
            $table->unsignedBigInteger('section_id')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->foreign('section_id')->references('id')->on('sections')->nullOnDelete();
            $table->foreign('category_id')->references('id')->on('categories')->nullOnDelete();
        });

        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->string('sku')->unique();
            $table->string('name')->nullable(); // size/flavor
            $table->unsignedBigInteger('price_cents');
            $table->unsignedInteger('stock_qty')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variants');
        Schema::dropIfExists('products');
        Schema::dropIfExists('sections');
        Schema::dropIfExists('categories');
    }
};

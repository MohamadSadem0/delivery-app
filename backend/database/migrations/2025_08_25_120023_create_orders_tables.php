<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('shipping_address_id')->nullable();
            $table->string('currency',3)->default('USD');
            $table->string('status')->default('PENDING');
            $table->unsignedBigInteger('subtotal_cents')->default(0);
            $table->unsignedBigInteger('shipping_cents')->default(0);
            $table->unsignedBigInteger('total_cents')->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
            $table->foreign('shipping_address_id')->references('id')->on('user_addresses')->nullOnDelete();
        });

        Schema::create('order_stores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('store_id');
            $table->enum('fulfillment_type', ['DELIVERY','PICKUP','SHIPPING'])->default('DELIVERY');
            $table->string('status')->default('PENDING');
            $table->unsignedBigInteger('items_subtotal_cents')->default(0);
            $table->unsignedBigInteger('delivery_fee_cents')->default(0);
            $table->unsignedBigInteger('total_cents')->default(0);
            $table->unsignedBigInteger('preferred_delivery_user_id')->nullable();
            $table->unsignedBigInteger('pickup_slot_id')->nullable();
            $table->timestamps();

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->foreign('preferred_delivery_user_id')->references('id')->on('users')->nullOnDelete();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_store_id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('product_variant_id')->nullable();
            $table->string('name');
            $table->unsignedInteger('qty');
            $table->unsignedBigInteger('unit_price_cents');
            $table->unsignedBigInteger('total_price_cents');
            $table->timestamps();
            $table->foreign('order_store_id')->references('id')->on('order_stores')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('product_variant_id')->references('id')->on('product_variants')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('order_stores');
        Schema::dropIfExists('orders');
    }
};

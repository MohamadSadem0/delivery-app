<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_store_id')->unique();
            $table->unsignedBigInteger('delivery_user_id')->nullable(); // accepted courier
            $table->string('status')->default('SEARCHING'); // SEARCHING, ASSIGNED, PICKED_UP, DELIVERED, CANCELLED
            $table->unsignedBigInteger('price_cents')->nullable();
            $table->unsignedInteger('eta_minutes')->nullable();
            $table->timestamps();

            $table->foreign('order_store_id')->references('id')->on('order_stores')->onDelete('cascade');
            $table->foreign('delivery_user_id')->references('id')->on('users')->nullOnDelete();
        });

        Schema::create('delivery_offers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('delivery_id');
            $table->unsignedBigInteger('delivery_user_id');
            $table->unsignedBigInteger('offer_price_cents');
            $table->unsignedInteger('eta_minutes')->nullable();
            $table->string('status')->default('PENDING'); // PENDING, ACCEPTED, REJECTED
            $table->timestamps();

            $table->foreign('delivery_id')->references('id')->on('deliveries')->onDelete('cascade');
            $table->foreign('delivery_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['delivery_id','delivery_user_id']);
        });

        Schema::create('delivery_events', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('delivery_id');
            $table->string('event');
            $table->json('meta')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->foreign('delivery_id')->references('id')->on('deliveries')->onDelete('cascade');
            $table->index(['delivery_id','created_at']);
        });

        Schema::create('driver_online_sessions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->timestamp('started_at')->useCurrent();
            $table->timestamp('ended_at')->nullable();
            $table->enum('source',['MOBILE','WEB','ADMIN'])->default('MOBILE');
            $table->timestamp('created_at')->useCurrent();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['user_id','started_at','ended_at'],'idx_dos_user_time');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('driver_online_sessions');
        Schema::dropIfExists('delivery_events');
        Schema::dropIfExists('delivery_offers');
        Schema::dropIfExists('deliveries');
    }
};

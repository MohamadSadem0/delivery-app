<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->string('provider')->default('COD'); // COD, stripe, etc.
            $table->string('provider_ref')->nullable();
            $table->string('status')->default('PENDING'); // PENDING, PAID, FAILED, REFUNDED
            $table->unsignedBigInteger('amount_cents');
            $table->json('meta')->nullable();
            $table->timestamps();

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->index(['status','created_at'],'idx_payments_created');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};

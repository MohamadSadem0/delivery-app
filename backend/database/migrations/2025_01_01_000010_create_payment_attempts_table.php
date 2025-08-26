<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_attempts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->string('idempotency_key')->nullable();
            $table->unsignedInteger('attempt_no')->default(1);
            $table->string('status')->default('pending'); // pending|succeeded|failed|canceled
            $table->json('meta')->nullable();
            $table->timestamps();

            $table->index(['order_id','idempotency_key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_attempts');
    }
};

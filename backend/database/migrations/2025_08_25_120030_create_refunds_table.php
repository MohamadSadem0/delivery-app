<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('refunds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('payment_id')->nullable();
            $table->unsignedInteger('amount');
            $table->string('currency', 3)->default('LBP');
            $table->string('status')->default('requested'); // requested|approved|declined|processed
            $table->string('reason')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();

            $table->index(['order_id','status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('refunds');
    }
};

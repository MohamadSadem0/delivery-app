<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payouts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('store_id');
            $table->dateTime('period_start')->nullable();
            $table->dateTime('period_end')->nullable();
            $table->unsignedInteger('gross_amount')->default(0);
            $table->unsignedInteger('commission_amount')->default(0);
            $table->unsignedInteger('net_amount')->default(0);
            $table->string('currency', 3)->default('LBP');
            $table->string('status')->default('pending'); // pending|processing|paid|failed
            $table->json('meta')->nullable();
            $table->timestamps();

            $table->index(['store_id','period_start','period_end']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payouts');
    }
};

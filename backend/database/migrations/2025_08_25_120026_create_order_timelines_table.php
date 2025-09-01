<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_timelines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->string('event');
            $table->json('data')->nullable();
            $table->timestamps();
            $table->index(['order_id','event']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_timelines');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('label', 50);
            $table->string('line1')->nullable();
            $table->string('line2')->nullable();
            $table->string('area', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('notes', 500)->nullable();
            $table->decimal('lat', 10, 7);
            $table->decimal('lng', 10, 7);
            $table->string('contact_name', 100)->nullable();
            $table->string('contact_phone', 30)->nullable();
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('addresses'); }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('feature_flags', function (Blueprint $table) {
            $table->id();
            $table->string('key');
            $table->boolean('value')->default(false);
            $table->string('scope_type')->nullable(); // global, user, store
            $table->unsignedBigInteger('scope_id')->nullable();
            $table->timestamps();
            $table->unique(['key','scope_type','scope_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('feature_flags');
    }
};

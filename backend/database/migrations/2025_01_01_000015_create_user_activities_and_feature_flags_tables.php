<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_activities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('event'); // login|logout
            $table->string('ip')->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();
            $table->index(['user_id','event']);
        });

        Schema::create('feature_flags', function (Blueprint $table) {
            $table->id();
            $table->string('key');
            $table->boolean('value')->default(true);
            $table->string('scope_type')->default('global'); // global|user|store
            $table->unsignedBigInteger('scope_id')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();

            $table->unique(['key','scope_type','scope_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('feature_flags');
        Schema::dropIfExists('user_activities');
    }
};

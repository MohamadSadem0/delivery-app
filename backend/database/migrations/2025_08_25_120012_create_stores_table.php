<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('owner_user_id'); // user with role VENDOR
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('type')->comment('restaurant, grocery, pharmacy, clothing, etc.');
            $table->text('description')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('banner_url')->nullable();
            $table->boolean('has_geo')->default(false);
            $table->timestamps();

            $table->foreign('owner_user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // add POINT column + spatial index (MySQL/MariaDB)
        DB::statement("ALTER TABLE stores ADD COLUMN geo_point POINT NOT NULL AFTER banner_url");
        DB::statement("CREATE SPATIAL INDEX spx_stores_point ON stores (geo_point)");
    }

    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};

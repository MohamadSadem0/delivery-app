<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('store_addresses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('store_id');
            $table->string('label')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('area')->nullable();
            $table->string('street')->nullable();
            $table->string('building')->nullable();
            $table->decimal('latitude',10,7)->nullable();
            $table->decimal('longitude',10,7)->nullable();
            $table->boolean('is_primary')->default(false);
            $table->boolean('has_geo')->default(false);
            $table->timestamps();

            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->index(['store_id','is_primary']);
        });

        DB::statement("ALTER TABLE store_addresses ADD COLUMN geo_point POINT NOT NULL AFTER longitude");
        DB::statement("CREATE SPATIAL INDEX spx_store_addresses_point ON store_addresses (geo_point)");
    }

    public function down(): void
    {
        Schema::dropIfExists('store_addresses');
    }
};

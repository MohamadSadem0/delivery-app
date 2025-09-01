<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('currency_rates', function (Blueprint $table) {
            $table->id();
            $table->string('base_currency', 3);
            $table->string('quote_currency', 3);
            $table->decimal('rate', 18, 6);
            $table->timestamp('effective_at')->useCurrent();
            $table->unique(['base_currency','quote_currency','effective_at']);
        });
    }
    public function down(): void { Schema::dropIfExists('currency_rates'); }
};

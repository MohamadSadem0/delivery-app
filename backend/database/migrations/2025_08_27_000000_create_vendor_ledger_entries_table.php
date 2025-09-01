<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendorLedgerEntriesTable extends Migration
{
    public function up(): void
    {
        Schema::create('vendor_ledger_entries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('store_id')->index();
            $table->unsignedBigInteger('order_id')->nullable()->index();
            $table->unsignedBigInteger('refund_id')->nullable()->index();
            $table->string('context', 50); // e.g. order_paid, refund_processed, payout_debit
            $table->enum('type', ['credit','debit'])->index();
            $table->bigInteger('amount'); // minor units (e.g., cents)
            $table->string('currency', 3)->default('LBP');
            $table->json('meta')->nullable();
            $table->timestamps();

            // Add FKs only if those tables exist & you want hard constraints:
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('set null');
            $table->foreign('refund_id')->references('id')->on('refunds')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendor_ledger_entries');
    }
}

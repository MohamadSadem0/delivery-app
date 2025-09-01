<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreatePaymentAttemptsTable extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('payment_attempts')) {
            Schema::create('payment_attempts', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('order_id')->index();
                $table->unsignedInteger('attempt_no')->index();           // 1,2,3...
                $table->string('idempotency_key', 200)->nullable();
                $table->string('status', 40)->default('started');          // started|PENDING|succeeded|failed
                $table->json('meta')->nullable();
                $table->timestamps();

                $table->unique(['order_id', 'attempt_no'], 'payment_attempts_order_attempt_unique');
            });
            return;
        }

        // Table exists: ensure required columns/index are present
        Schema::table('payment_attempts', function (Blueprint $table) {
            if (!Schema::hasColumn('payment_attempts', 'attempt_no')) {
                $table->unsignedInteger('attempt_no')->after('order_id')->index();
            }
            if (!Schema::hasColumn('payment_attempts', 'idempotency_key')) {
                $table->string('idempotency_key', 200)->nullable()->after('attempt_no');
            }
            if (!Schema::hasColumn('payment_attempts', 'status')) {
                $table->string('status', 40)->default('started')->after('idempotency_key');
            }
            if (!Schema::hasColumn('payment_attempts', 'meta')) {
                $table->json('meta')->nullable()->after('status');
            }
        });

        // Add unique index if missing
        if (!$this->indexExists('payment_attempts', 'payment_attempts_order_attempt_unique')) {
            Schema::table('payment_attempts', function (Blueprint $table) {
                $table->unique(['order_id', 'attempt_no'], 'payment_attempts_order_attempt_unique');
            });
        }
    }

    public function down(): void
    {
        // Safe rollback: drop unique if present, then drop table if desired
        if (Schema::hasTable('payment_attempts')) {
            if ($this->indexExists('payment_attempts', 'payment_attempts_order_attempt_unique')) {
                Schema::table('payment_attempts', function (Blueprint $table) {
                    $table->dropUnique('payment_attempts_order_attempt_unique');
                });
            }
            Schema::dropIfExists('payment_attempts');
        }
    }

    private function indexExists(string $table, string $name): bool
    {
        // MySQL-specific; adjust if you support other drivers
        try {
            $rows = DB::select('SHOW INDEX FROM `' . $table . '` WHERE Key_name = ?', [$name]);
            return !empty($rows);
        } catch (\Throwable $e) {
            // If SHOW INDEX not supported, assume exists=false so we try to create (Schema will error if truly exists)
            return false;
        }
    }
}

<?php

namespace App\Domain\Payout\Services;

use App\Domain\Payout\Models\Payout;
use App\Domain\Payout\Models\VendorLedgerEntry;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Barryvdh\DomPDF\Facade\Pdf; // <= add this import

class VendorStatementService
{
    /**
     * Determine statement period for a payout:
     * from = previous paid payout's paid_at (exclusive) or epoch of time,
     * to   = this payout's paid_at if set; else created_at (inclusive).
     */
    public function periodFor(Payout $payout): array
    {
        $storeId = $payout->store_id;

        $prev = Payout::query()
            ->where('store_id', $storeId)
            ->where('status', 'paid')
            ->where('id', '<', $payout->id)
            ->orderByDesc('id')
            ->first();

        $from = $prev?->paid_at ?? $prev?->created_at ?? Carbon::create(1970, 1, 1, 0, 0, 0, 'UTC');
        $to   = $payout->paid_at ?? $payout->created_at ?? now();

        // Normalize to Carbon instances
        $from = $from instanceof Carbon ? $from : Carbon::parse($from);
        $to   = $to   instanceof Carbon ? $to   : Carbon::parse($to);

        return [$from, $to];
    }
    public function renderPdf(Payout $payout)
    {
        $data = $this->build($payout);

        $pdf = Pdf::loadView('vendor.statement', [
            'data' => $data,
        ])->setPaper('a4', 'portrait');

        $filename = sprintf('statement-store-%d-payout-%d.pdf', $data['store_id'], $data['payout_id']);

        // You can also ->stream($filename) if you prefer inline
        return $pdf->download($filename);
    }

    /**
     * Build ledger slice for the payout's period.
     */
    public function build(Payout $payout): array
    {
        [$from, $to] = $this->periodFor($payout);

        $entries = VendorLedgerEntry::query()
            ->where('store_id', $payout->store_id)
            ->whereBetween('created_at', [$from, $to])
            ->orderBy('created_at')
            ->get(['id','context','type','amount','currency','created_at','order_id','refund_id','meta']);

        $credits = (int) $entries->where('type', 'credit')->sum('amount');
        $debits  = (int) $entries->where('type', 'debit')->sum('amount');
        $net     = $credits - $debits;

        return [
            'store_id'  => $payout->store_id,
            'payout_id' => $payout->id,
            'currency'  => $payout->currency ?? 'LBP',
            'from'      => $from,
            'to'        => $to,
            'entries'   => $entries,
            'totals'    => [
                'credits' => $credits,
                'debits'  => $debits,
                'net'     => $net,
                'payout'  => (int) $payout->amount,
                'balance_after_payout' => $net - (int) $payout->amount,
            ],
        ];
    }

    /**
     * Stream CSV download for a payout statement.
     */
    public function renderCsv(Payout $payout): StreamedResponse
    {
        $data = $this->build($payout);
        $filename = sprintf('statement-store-%d-payout-%d.csv', $data['store_id'], $data['payout_id']);

        $headers = [
            'Content-Type'        => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ];

        return response()->streamDownload(function () use ($data) {
            $out = fopen('php://output', 'w');

            // UTF-8 BOM for Excel compatibility
            fwrite($out, chr(0xEF).chr(0xBB).chr(0xBF));

            // Header section
            fputcsv($out, ['Store ID', $data['store_id']]);
            fputcsv($out, ['Payout ID', $data['payout_id']]);
            fputcsv($out, ['Period From', $data['from']->toIso8601String()]);
            fputcsv($out, ['Period To', $data['to']->toIso8601String()]);
            fputcsv($out, ['Currency', $data['currency']]);
            fputcsv($out, []); // blank line

            // Table header
            fputcsv($out, ['#', 'Date', 'Context', 'Type', 'Amount', 'Order ID', 'Refund ID']);

            foreach ($data['entries'] as $e) {
                fputcsv($out, [
                    $e->id,
                    optional($e->created_at)->toDateTimeString(),
                    $e->context,
                    $e->type,
                    $e->amount,
                    $e->order_id,
                    $e->refund_id,
                ]);
            }

            fputcsv($out, []); // blank line
            fputcsv($out, ['Totals']);
            fputcsv($out, ['Credits', $data['totals']['credits']]);
            fputcsv($out, ['Debits',  $data['totals']['debits']]);
            fputcsv($out, ['Net',     $data['totals']['net']]);
            fputcsv($out, ['Payout Amount', $data['totals']['payout']]);
            fputcsv($out, ['Balance After Payout', $data['totals']['balance_after_payout']]);

            fclose($out);
        }, $filename, $headers);
    }
}

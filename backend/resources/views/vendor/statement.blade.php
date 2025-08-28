<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Vendor Statement</title>
    <style>
        @page { margin: 24mm 16mm; }
        body { font-family: DejaVu Sans, Arial, Helvetica, sans-serif; color: #111; font-size: 12px; }
        h1 { font-size: 20px; margin: 0 0 8px; }
        h2 { font-size: 14px; margin: 16px 0 8px; }
        .muted { color: #666; }
        .row { display: flex; justify-content: space-between; gap: 12px; }
        .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 6px; }
        th, td { border: 1px solid #e5e7eb; padding: 6px 8px; text-align: left; }
        th { background: #f3f4f6; font-weight: 600; }
        .right { text-align: right; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11px; background: #eef2ff; }
        .totals td { font-weight: 700; }
    </style>
</head>
<body>
    @php
        $d = $data;
        $fmt = fn($n) => number_format((int)$n, 0);
    @endphp

    <h1>Vendor Statement</h1>
    <div class="muted">Store #{{ $d['store_id'] }} &middot; Payout #{{ $d['payout_id'] }}</div>

    <div class="row" style="margin-top:12px;">
        <div class="card" style="flex:1;">
            <h2>Period</h2>
            <div>From: <strong>{{ $d['from']->toDateTimeString() }}</strong></div>
            <div>To: <strong>{{ $d['to']->toDateTimeString() }}</strong></div>
        </div>
        <div class="card" style="flex:1;">
            <h2>Currency</h2>
            <div><strong>{{ $d['currency'] }}</strong></div>
        </div>
        <div class="card" style="flex:1;">
            <h2>Payout</h2>
            <div>Amount: <strong>{{ $fmt($d['totals']['payout']) }} {{ $d['currency'] }}</strong></div>
            <div class="muted">Balance After: <strong>{{ $fmt($d['totals']['balance_after_payout']) }} {{ $d['currency'] }}</strong></div>
        </div>
    </div>

    <div class="card">
        <h2>Ledger Entries <span class="badge">{{ $d['entries']->count() }}</span></h2>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Context</th>
                    <th>Type</th>
                    <th class="right">Amount</th>
                    <th>Order</th>
                    <th>Refund</th>
                </tr>
            </thead>
            <tbody>
                @forelse($d['entries'] as $e)
                    <tr>
                        <td>{{ $e->id }}</td>
                        <td>{{ optional($e->created_at)->toDateTimeString() }}</td>
                        <td>{{ $e->context }}</td>
                        <td>{{ strtoupper($e->type) }}</td>
                        <td class="right">{{ $fmt($e->amount) }}</td>
                        <td>{{ $e->order_id ?: '—' }}</td>
                        <td>{{ $e->refund_id ?: '—' }}</td>
                    </tr>
                @empty
                    <tr><td colspan="7" class="muted">No entries in this period.</td></tr>
                @endforelse
            </tbody>
            <tfoot>
                <tr class="totals">
                    <td colspan="4" class="right">Credits</td>
                    <td class="right">{{ $fmt($d['totals']['credits']) }}</td>
                    <td colspan="2"></td>
                </tr>
                <tr class="totals">
                    <td colspan="4" class="right">Debits</td>
                    <td class="right">{{ $fmt($d['totals']['debits']) }}</td>
                    <td colspan="2"></td>
                </tr>
                <tr class="totals">
                    <td colspan="4" class="right">Net</td>
                    <td class="right">{{ $fmt($d['totals']['net']) }}</td>
                    <td colspan="2"></td>
                </tr>
            </tfoot>
        </table>
    </div>

    <div class="muted" style="margin-top:8px;">
        Generated at {{ now()->toDateTimeString() }}
    </div>
</body>
</html>

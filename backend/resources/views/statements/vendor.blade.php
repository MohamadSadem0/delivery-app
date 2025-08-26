<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vendor Statement #{{ $payout->id }}</title>
  <style>
    body { font-family: DejaVu Sans, sans-serif; }
    h1 { font-size: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
  </style>
</head>
<body>
  <h1>Vendor Statement</h1>
  <p>Payout ID: {{ $payout->id }}</p>
  <p>Period: {{ $payout->period_start }} → {{ $payout->period_end }}</p>
  <p>Store: {{ $payout->store->name }}</p>
  <table>
    <tr><th>Gross</th><td>{{ $payout->gross_amount }}</td></tr>
    <tr><th>Commission</th><td>{{ $payout->commission_amount }}</td></tr>
    <tr><th>Net</th><td>{{ $payout->net_amount }}</td></tr>
    <tr><th>Status</th><td>{{ $payout->status }}</td></tr>
  </table>
</body>
</html>

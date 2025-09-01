<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class FinanceDashboardController extends Controller
{
    public function summary()
    {
        $totalSales = (int) DB::table('orders')->where('status','delivered')->sum('total');
        $totalOrders = (int) DB::table('orders')->count();
        $avgOrder = $totalOrders > 0 ? round($totalSales / $totalOrders, 2) : 0;

        return response()->json([
            'total_sales' => $totalSales,
            'total_orders' => $totalOrders,
            'avg_order_value' => $avgOrder,
        ]);
    }

    public function salesByZone()
    {
        $rows = DB::table('orders')
            ->select('delivery_address_city as city', DB::raw('SUM(total) as total_sales'), DB::raw('COUNT(*) as orders'))
            ->where('status','delivered')
            ->groupBy('delivery_address_city')
            ->orderByDesc('total_sales')
            ->get();

        return response()->json($rows);
    }

    public function topStores()
    {
        $rows = DB::table('orders')
            ->join('order_items','orders.id','=','order_items.order_id')
            ->select('order_items.store_id', DB::raw('SUM(order_items.line_total) as revenue'))
            ->where('orders.status','delivered')
            ->groupBy('order_items.store_id')
            ->orderByDesc('revenue')
            ->limit(10)
            ->get();

        return response()->json($rows);
    }
}

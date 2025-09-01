<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class MetricsController extends Controller
{
    public function __invoke()
    {
        $totalOrders = (int) DB::table('orders')->count();
        $delivered = (int) DB::table('orders')->where('status','delivered')->count();
        $users = (int) DB::table('users')->count();

        $out = [];
        $out[] = "# HELP app_orders_total Total orders";
        $out[] = "# TYPE app_orders_total counter";
        $out[] = "app_orders_total {$totalOrders}";
        $out[] = "# HELP app_orders_delivered Total delivered orders";
        $out[] = "# TYPE app_orders_delivered counter";
        $out[] = "app_orders_delivered {$delivered}";
        $out[] = "# HELP app_users_total Total users";
        $out[] = "# TYPE app_users_total gauge";
        $out[] = "app_users_total {$users}";

        return response(implode("\n",$out),200)->header('Content-Type','text/plain');
    }
}

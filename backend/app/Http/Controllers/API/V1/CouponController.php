<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Domain\Order\Models\Coupon;
use App\Domain\Order\Services\CouponService;
use App\Domain\Cart\Models\Cart;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function preview(Request $request, CouponService $service)
    {
        $code = strtoupper(trim((string) $request->get('code')));
        $coupon = Coupon::where('code', $code)->first();

        if (!$coupon || !$coupon->isActiveNow()) {
            return response()->json(['message' => 'Invalid coupon'], 404);
        }

        $cart = Cart::where('user_id', auth('api')->id())->with('items.product')->first();
        if (!$cart) return response()->json(['message' => 'Cart is empty'], 422);

        $subtotal = $cart->items->sum(function ($item) {
            $unit = (int) ($item->product->sale_price ?? $item->product->price);
            return $unit * (int) $item->qty;
        });

        $res = $service->apply($coupon, $subtotal);

        return response()->json([
            'coupon' => ['code' => $coupon->code, 'type' => $coupon->type, 'value' => $coupon->value],
            'subtotal' => $subtotal,
            'discount' => $res['discount'],
            'total_after' => max(0, $subtotal - $res['discount']),
        ]);
    }
}

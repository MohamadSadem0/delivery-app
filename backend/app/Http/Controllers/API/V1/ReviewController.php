<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\StoreReviewRequest;
use App\Domain\Review\Models\Review;
use App\Domain\Order\Models\OrderItem;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(StoreReviewRequest $request)
    {
        $data = $request->validated();
        $userId = auth('api')->id();

        // Simple verified-purchase rule:
        if (!empty($data['product_id'])) {
            $purchased = OrderItem::query()
                ->whereHas('order', fn($q) => $q->where('user_id', $userId)->where('status', '!=', 'canceled'))
                ->where('product_id', $data['product_id'])
                ->exists();
            if (!$purchased) {
                return response()->json(['message' => 'You can only review products you purchased'], 403);
            }
        }

        $review = Review::create([
            'user_id' => $userId,
            'product_id' => $data['product_id'] ?? null,
            'store_id' => $data['store_id'] ?? null,
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
        ]);

        return response()->json(['message' => 'Review submitted', 'data' => $review], 201);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\ReviewRequest;
use App\Http\Requests\Review\DeliveryReviewRequest;
use App\Models\Review;
use App\Models\DeliveryReview;

class ReviewController extends Controller
{
    public function storeReview(ReviewRequest $request)
    {
        $data = $request->validated();
        if (empty($data['store_id']) && empty($data['product_id'])) {
            return response()->json(['message'=>'store_id or product_id required'], 422);
        }
        $review = Review::create([
            'user_id' => auth('api')->id(),
            'store_id' => $data['store_id'] ?? null,
            'product_id' => $data['product_id'] ?? null,
            'rating' => $data['rating'],
            'comment'=> $data['comment'] ?? null,
            'status' => 'PENDING',
        ]);
        return response()->json(['review'=>$review], 201);
    }

    public function deliveryReview(DeliveryReviewRequest $request)
    {
        $data = $request->validated();
        $rev = DeliveryReview::updateOrCreate(
            ['user_id'=>auth('api')->id(),'delivery_id'=>$data['delivery_id']],
            ['rating'=>$data['rating'],'comment'=>$data['comment'] ?? null]
        );
        return response()->json(['review'=>$rev], 201);
    }
}

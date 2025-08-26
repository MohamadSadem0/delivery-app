<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\Admin\UserController;
use App\Http\Controllers\API\V1\Admin\StoreController;

Route::prefix('v1/admin')
    ->middleware(['auth:api'])
    ->group(function () {
        Route::get('users',[UserController::class,'index']);
        Route::get('users/{user}',[UserController::class,'show']);
        Route::delete('users/{user}',[UserController::class,'destroy']);

        Route::get('stores',[StoreController::class,'index']);
        Route::patch('stores/{store}/approve',[StoreController::class,'approve']);
        Route::patch('stores/{store}/suspend',[StoreController::class,'suspend']);
    });

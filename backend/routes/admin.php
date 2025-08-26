<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\Admin\UserController;
use App\Http\Controllers\API\V1\Admin\StoreAdminController;

Route::prefix('v1/admin')
    ->middleware(['auth:api','ensure.admin'])
    ->group(function () {
        Route::get('users', [UserController::class,'index']);
        Route::get('users/{user}', [UserController::class,'show']);
        Route::patch('users/{user}', [UserController::class,'update']);

        Route::get('stores', [StoreAdminController::class,'index']);
        Route::patch('stores/{store}/toggle', [StoreAdminController::class,'toggle']);
    });

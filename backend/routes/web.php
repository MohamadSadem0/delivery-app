<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocsController;

Route::get('/docs/openapi.json', [DocsController::class,'openapi']);

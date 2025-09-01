<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;

class DocsController extends Controller
{
    public function openapi()
    {
        return response()->json([
            'openapi' => '3.0.0',
            'info' => [
                'title' => 'Lebanon MultiVendor API',
                'version' => '1.0.0'
            ],
            'paths' => [
                '/api/v1/auth/login' => ['post' => ['summary' => 'Login']],
                '/api/v1/catalog/products' => ['get' => ['summary' => 'List products']],
            ]
        ]);
    }
}

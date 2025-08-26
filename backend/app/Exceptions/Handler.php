<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler
{
    protected $levels = [];
    protected $dontReport = [];
    protected $dontFlash = ['current_password','password','password_confirmation'];

    public function register(): void
    {
        //
    }

    public function render($request, Throwable $e)
    {
        if ($request->is('api/*')) {
            if ($e instanceof ValidationException) {
                return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
            }
            if ($e instanceof AuthenticationException) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }
            if ($e instanceof NotFoundHttpException) {
                return response()->json(['message' => 'Not found'], 404);
            }
            return response()->json(['message' => $e->getMessage() ?: 'Server error'], 500);
        }
        return parent::render($request, $e);
    }
}

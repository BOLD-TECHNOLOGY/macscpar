<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/admin/register', [AuthController::class, 'adminRegister'])->middleware('auth:sanctum');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::get('/users', [UserController::class, 'getUsers']);
    Route::get('/users/{id}', [UserController::class, 'getUserDetails']);
    Route::put('/users/{id}', [UserController::class, 'updateUser']);
    Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
    Route::get('/users-stats', [UserController::class, 'getUserStats']);
});

Route::apiResource('posts', PostController::class);
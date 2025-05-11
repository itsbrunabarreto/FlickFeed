<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\SerieController;


Route::get('/user', function (Request $request) 
{
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('/user')->group(function ()
{
    Route::get('/index', [UsuarioController::class, 'index']);
    Route::get('/show/{id}', [UsuarioController::class, 'show']);
    Route::post('/store', [UsuarioController::class, 'store']);
    Route::put('/update/{id}', [UsuarioController::class, 'update']);
    Route::delete('/destroy/{id}', [UsuarioController::class, 'destroy']);

});

Route::prefix('movie')->group(function() {

    Route::get('/index', [MovieController::class, 'index']);
    Route::get('/show/{id}', [MovieController::class, 'show']);
    Route::post('/store', [MovieController::class, 'store']);
    Route::put('/update/{id}', [MovieController::class, 'update']);
    Route::delete('/destroy/{id}', [MovieController::class, 'destroy']);
});

Route::prefix('serie')->group(function() {

    Route::get('/index', [SerieController::class, 'index']);
    Route::get('/show/{id}', [SerieController::class, 'show']);
    Route::post('/store', [SerieController::class, 'store']);
    Route::put('/update/{id}', [SerieController::class, 'update']);
    Route::delete('/destroy/{id}', [SerieController::class, 'destroy']);
});
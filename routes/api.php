<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\SerieController;
use App\Http\Controllers\Api\EpisodeController;
use App\Http\Controllers\Api\WatchedMovieController;
use App\Http\Controllers\Api\WatchedEpisodeController;
use App\Http\Controllers\Api\ListController;
use App\Http\Controllers\Api\RatingController;

// Novos Controllers para autenticação e senha
use App\Http\Controllers\Api\RegisterUserController;
use App\Http\Controllers\Api\VerifyUserAccount;
use App\Http\Controllers\Api\ResetPasswordController;

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

// ROTAS DE AUTENTICAÇÃO E SENHA
Route::post('/signup', [RegisterUserController::class, 'signup']); // Cadastro usuário
Route::get('/verify_account', [VerifyUserAccount::class, 'verifyUserAccount']); // Verificação de e-mail

// Recuperação e redefinição de senha
Route::post('/forgot-password', [ResetPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

// Para alteração de senha de usuário logado (exemplo, se quiser implementar)
Route::middleware('auth:sanctum')->post('/change-password', [ResetPasswordController::class, 'changePassword']);

Route::prefix('movie')->group(function() {
    Route::get('/index', [MovieController::class, 'index']);
    Route::get('/show/{id}', [MovieController::class, 'show']);
    Route::post('/store', [MovieController::class, 'store']);
    Route::match(['post', 'put'], '/update/{id}', [MovieController::class, 'update']);
    Route::delete('/destroy/{id}', [MovieController::class, 'destroy']);
});

Route::prefix('serie')->group(function() {
    Route::get('/index', [SerieController::class, 'index']);
    Route::get('/show/{id}', [SerieController::class, 'show']);
    Route::post('/store', [SerieController::class, 'store']);
    Route::put('/update/{id}', [SerieController::class, 'update']);
    Route::delete('/destroy/{id}', [SerieController::class, 'destroy']);
});

Route::prefix('/episode')->group(function () {
    Route::get('/index', [EpisodeController::class, 'index']); 
    Route::get('/index/{serieId}/season/{season}', [EpisodeController::class, 'getBySeason']);
    Route::get('/show/{id}', [EpisodeController::class, 'show']);
    Route::post('/store', [EpisodeController::class, 'store']);
    Route::put('/update/{id}', [EpisodeController::class, 'update']);
    Route::delete('/destroy/{id}', [EpisodeController::class, 'destroy']);
});

Route::prefix('lists')->group(function() {
    // Criar uma nova lista
    Route::post('/store', [ListController::class, 'store']);
    // Listar todas as listas do usuário
    Route::get('/index', [ListController::class, 'index']);
    // Adicionar um item à lista
    Route::post('/{listId}/addItem', [ListController::class, 'addItem']);
    // Listar os itens de uma lista
    Route::get('/{listId}/items', [ListController::class, 'listItems']);
    // Excluir um item de uma lista
    Route::delete('/{listId}/removeItem/{itemId}', [ListController::class, 'removeItem']);
});

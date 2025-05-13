<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rating; // O modelo Rating
use App\Models\Movie; // O modelo Movie
use App\Models\Serie; // O modelo Serie

class RatingController extends Controller
{
    // Criar uma avaliação
    public function store(Request $request)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|between:1,5',  // Alterado para aceitar entre 1 e 5
            'movie_id' => 'nullable|exists:movies,id',   // Valida se o filme existe
            'series_id' => 'nullable|exists:series,id',  // Valida se a série existe
        ]);

        // Garantir que ou series_id ou movie_id seja informado, mas não ambos
        if ($validated['movie_id'] && $validated['series_id']) {
            return response()->json(['error' => 'Você deve informar apenas uma das opções: filme ou série.'], 400);
        }

        // Criar a avaliação
        $rating = Rating::create([
            'user_id' => auth()->id(),
            'rating' => $validated['rating'],
            'movie_id' => $validated['movie_id'] ?? null,
            'series_id' => $validated['series_id'] ?? null,
        ]);

        return response()->json($rating, 201);
    }

    // Listar as avaliações do usuário
    public function index()
    {
        $ratings = Rating::where('user_id', auth()->id())->get();

        return response()->json($ratings);
    }

    // Mostrar uma avaliação específica
    public function show($id)
    {
        $rating = Rating::findOrFail($id);

        return response()->json($rating);
    }

    // Atualizar uma avaliação
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|between:1,5', // Alterado para aceitar entre 1 e 5
            'movie_id' => 'nullable|exists:movies,id',
            'series_id' => 'nullable|exists:series,id',
        ]);

        // Garantir que ou series_id ou movie_id seja informado, mas não ambos
        if ($validated['movie_id'] && $validated['series_id']) {
            return response()->json(['error' => 'Você deve informar apenas uma das opções: filme ou série.'], 400);
        }

        $rating = Rating::findOrFail($id);

        $rating->update([
            'rating' => $validated['rating'],
            'movie_id' => $validated['movie_id'] ?? null,
            'series_id' => $validated['series_id'] ?? null,
        ]);

        return response()->json($rating);
    }

    // Excluir uma avaliação
    public function destroy($id)
    {
        $rating = Rating::findOrFail($id);
        $rating->delete();

        return response()->json(['message' => 'Avaliação excluída com sucesso.'], 200);
    }
}

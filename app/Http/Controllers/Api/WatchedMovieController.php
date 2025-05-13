<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WatchedMovie;
use Illuminate\Http\Request;

class WatchedMovieController extends Controller
{
    public function index()
    {
        return response()->json(WatchedMovie::with(['user', 'movie'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'movie_id' => 'required|exists:movies,id',
        ]);

        $watched = WatchedMovie::create($validated);
        return response()->json($watched, 201);
    }

    public function destroy($id)
    {
        $watched = WatchedMovie::findOrFail($id);
        $watched->delete();
        return response()->json(null, 204);
    }
}

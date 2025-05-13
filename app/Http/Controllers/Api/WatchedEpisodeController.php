<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WatchedEpisode;
use Illuminate\Http\Request;

class WatchedEpisodeController extends Controller
{
    public function index()
    {
        return response()->json(WatchedEpisode::with(['user', 'episode'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'episode_id' => 'required|exists:episodes,id',
        ]);

        $watched = WatchedEpisode::create($validated);
        return response()->json($watched, 201);
    }

    public function destroy($id)
    {
        $watched = WatchedEpisode::findOrFail($id);
        $watched->delete();
        return response()->json(null, 204);
    }
}

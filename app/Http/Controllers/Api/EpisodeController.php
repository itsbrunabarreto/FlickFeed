<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Episode;
use Illuminate\Support\Facades\Validator;

class EpisodeController extends Controller
{
    // Retorna os episódios de uma série específica
    public function index($serieId)
    {
        $episodes = Episode::where('series_id', $serieId)->get();

        return response()->json([
            'message' => 'Lista de episódios da série',
            'data' => $episodes,
            'status' => 200
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'series_id' => 'required|exists:series,id',
            'season' => 'required|integer|min:1',
            'episode_number' => 'required|integer|min:1',
            'title' => 'required|string|max:200',
            'air_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação',
                'data' => $validator->errors(),
                'status' => 422
            ], 422);
        }

        $episode = Episode::create($request->all());

        return response()->json([
            'message' => 'Episódio criado com sucesso',
            'data' => $episode,
            'status' => 201
        ], 201);
    }

    public function show($id)
    {
        $episode = Episode::with('series')->find($id);

        if (!$episode) {
            return response()->json([
                'message' => 'Episódio não encontrado',
                'status' => 404
            ], 404);
        }

        return response()->json([
            'message' => 'Episódio encontrado',
            'data' => $episode,
            'status' => 200
        ]);
    }

    public function update(Request $request, $id)
    {
        $episode = Episode::find($id);

        if (!$episode) {
            return response()->json([
                'message' => 'Episódio não encontrado',
                'status' => 404
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'series_id' => 'sometimes|exists:series,id',
            'season' => 'sometimes|integer|min:1',
            'episode_number' => 'sometimes|integer|min:1',
            'title' => 'sometimes|string|max:200',
            'air_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação',
                'data' => $validator->errors(),
                'status' => 422
            ], 422);
        }

        $episode->update($request->all());

        return response()->json([
            'message' => 'Episódio atualizado com sucesso',
            'data' => $episode,
            'status' => 200
        ]);
    }

    public function destroy($id)
    {
        $episode = Episode::find($id);

        if (!$episode) {
            return response()->json([
                'message' => 'Episódio não encontrado',
                'status' => 404
            ], 404);
        }

        $episode->delete();

        return response()->json([
            'message' => 'Episódio excluído com sucesso',
            'status' => 200
        ]);
    }
}

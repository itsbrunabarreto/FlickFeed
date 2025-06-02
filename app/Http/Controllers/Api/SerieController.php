<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Serie;

class SerieController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $pageSize = $request->get('pageSize', 5);
        $dir = $request->get('dir', 'asc');
        $props = $request->get('props', 'id');
        $search = $request->get('search', '');

        $query = Serie::with('episodes')  
            ->select('id', 'title', 'description', 'release_year', 'genre', 'image')
            ->whereNull('deleted_at')
            ->orderBy($props, $dir);

        if ($search) {
            $query->where('title', 'like', "%$search%")
                  ->orWhere('genre', 'like', "%$search%");
        }

        $total = $query->count();
        $data = $query->offset(($page - 1) * $pageSize)->limit($pageSize)->get();
        $totalPages = ceil($total / $pageSize);

        return response()->json([
            'message' => 'Relatório de Séries',
            'status' => 200,
            'page' => $page,
            'pageSize' => $pageSize,
            'dir' => $dir,
            'props' => $props,
            'search' => $search,
            'total' => $total,
            'totalPages' => $totalPages,
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'release_year' => 'required|integer|between:1900,2100',
            'genre' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro nas informações da série',
                'data' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('series', 'public');
        }

        $serie = Serie::create([
            'title' => $request->title,
            'description' => $request->description,
            'release_year' => $request->release_year,
            'genre' => $request->genre,
            'image' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Série cadastrada com sucesso',
            'data' => $serie,
            'status' => 201,
        ], 201);
    }

    public function show(Request $request, string $id)
    {
        try {
            $serie = Serie::with('episodes')->findOrFail($id);  

            return response()->json([
                'message' => 'Série localizada com sucesso',
                'data' => $serie,
                'status' => 200,
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Série não localizada',
                'status' => 404,
            ], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'release_year' => 'required|integer|between:1900,2100',
            'genre' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro nas informações da série',
                'data' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        $serie = Serie::find($id);

        if (!$serie) {
            return response()->json([
                'message' => 'Série não localizada',
                'data' => $id,
                'status' => 404,
            ], 404);
        }

        $serie->title = $request->title ?? $serie->title;
        $serie->description = $request->description ?? $serie->description;
        $serie->release_year = $request->release_year ?? $serie->release_year;
        $serie->genre = $request->genre ?? $serie->genre;

        if ($request->hasFile('image')) {
            if ($serie->image) {
                Storage::disk('public')->delete($serie->image);
            }
            $serie->image = $request->file('image')->store('series', 'public');
        }

        $serie->save();

        return response()->json([
            'message' => 'Série alterada com sucesso',
            'data' => $serie,
            'status' => 200,
        ], 200);
    }

    public function destroy(Request $request, string $id)
    {
        $serie = Serie::find($id);

        if (!$serie) {
            return response()->json([
                'message' => 'Série não localizada',
                'data' => $id,
                'status' => 404,
            ], 404);
        }

        if ($serie->image) {
            Storage::disk('public')->delete($serie->image);
        }

        $serie->delete();

        return response()->json([
            'message' => 'Série excluída com sucesso',
            'status' => 200,
        ], 200);
    }
}

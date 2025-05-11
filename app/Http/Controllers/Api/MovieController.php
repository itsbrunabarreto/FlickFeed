<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Movie;
use Illuminate\Support\Facades\Storage;

class MovieController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $pageSize = $request->get('pageSize', 5);
        $dir = $request->get('dir', 'asc');
        $props = $request->get('props', 'id');
        $search = $request->get('search', '');

        $query = Movie::select('id', 'title', 'description', 'release_year', 'genre', 'image')
            ->whereNull('deleted_at')
            ->orderBy($props, $dir);

        if ($search) {
            $query->where('title', 'like', "%$search%")
                  ->orWhere('genre', 'like', "%$search%");
        }

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->get();

        $totalPages = ceil($total / $pageSize);

        return response()->json([
            'message' => 'Relatório de Filmes',
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Imagem opcional
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro nas informações do filme',
                'data' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        // Caso tenha imagem
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('movies', 'public');
        }

        $movie = Movie::create([
            'title' => $request->title,
            'description' => $request->description,
            'release_year' => $request->release_year,
            'genre' => $request->genre,
            'image' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Filme Cadastrado com Sucesso',
            'data' => $movie,
            'status' => 201,
        ], 201);
    }

    public function show(Request $request, string $id)
    {
        try {
            $movie = Movie::findOrFail($id);

            return response()->json([
                'message' => 'Filme localizado com sucesso',
                'data' => $movie,
                'status' => 200,
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Filme não localizado',
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Imagem opcional
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro nas informações do filme',
                'data' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json([
                'message' => 'Filme não localizado',
                'data' => $id,
                'status' => 404,
            ], 404);
        }

        $movie->title = $request->title ?? $movie->title;
        $movie->description = $request->description ?? $movie->description;
        $movie->release_year = $request->release_year ?? $movie->release_year;
        $movie->genre = $request->genre ?? $movie->genre;

        if ($request->hasFile('image')) {
            // Deletar imagem antiga
            if ($movie->image) {
                Storage::disk('public')->delete($movie->image);
            }
            $movie->image = $request->file('image')->store('movies', 'public');
        }

        $movie->save();

        return response()->json([
            'message' => 'Filme alterado com sucesso',
            'data' => $movie,
            'status' => 200,
        ], 200);
    }

    public function destroy(Request $request, string $id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json([
                'message' => 'Filme não localizado',
                'data' => $id,
                'status' => 404,
            ], 404);
        }

        // Deletar a imagem associada ao filme
        if ($movie->image) {
            Storage::disk('public')->delete($movie->image);
        }

        $movie->delete();

        return response()->json([
            'message' => 'Filme Excluído com Sucesso',
            'status' => 200,
        ], 200);
    }
}

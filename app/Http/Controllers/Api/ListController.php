<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lists;
use App\Models\ListItem;

class ListController extends Controller
{
    // Criar uma nova lista
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $list = Lists::create([
            'name' => $validated['name'],
            'user_id' => auth()->id(),
        ]);

        return response()->json($list, 201);
    }

    // Listar todas as listas do usuário
    public function index()
    {
        $lists = Lists::where('user_id', auth()->id())->get();
        return response()->json($lists);
    }

    // Adicionar um item (filme ou série) à lista
    public function addItem(Request $request, $listId)
    {
        $validated = $request->validate([
            'item_type' => 'required|string|in:movie,serie',
            'item_id' => 'required|integer',
        ]);

        $listItem = ListItem::create([
            'list_id' => $listId,
            'item_type' => $validated['item_type'],
            'item_id' => $validated['item_id'],
        ]);

        return response()->json($listItem, 201);
    }

    // Listar os itens de uma lista
    public function listItems($listId)
    {
        $listItems = ListItem::where('list_id', $listId)->get();
        return response()->json($listItems);
    }

    // Remover um item da lista
    public function removeItem($listId, $itemId)
    {
        $listItem = ListItem::where('list_id', $listId)->where('item_id', $itemId)->first();

        if ($listItem) {
            $listItem->delete();
            return response()->json(['message' => 'Item removido com sucesso'], 200);
        }

        return response()->json(['message' => 'Item não encontrado'], 404);
    }

    // Excluir uma lista inteira
    public function destroy($id)
    {
        $list = Lists::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$list) {
            return response()->json(['message' => 'Lista não encontrada'], 404);
        }

        $list->delete();

        return response()->json(['message' => 'Lista excluída com sucesso'], 200);
    }
}

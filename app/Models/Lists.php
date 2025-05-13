<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lists extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',       // Relacionamento com o usuário dono da lista
        'title',         // Título da lista
        'description',   // Descrição da lista
        'type',          // Tipo de lista, pode ser "movies" ou "series", por exemplo
    ];

    /**
     * Relacionamento com o modelo User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relacionamento com os itens da lista (pode ser filmes ou séries)
     */
    public function items()
    {
        return $this->hasMany(ListItem::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'lists_id',    // ID da lista
        'movies_id',   // ID do filme (se for o caso)
        'series_id',   // ID da série (se for o caso)
    ];

    /**
     * Relacionamento com o modelo List
     */
    public function lists()
    {
        return $this->belongsTo(Lists::class);
    }

    /**
     * Relacionamento com o modelo Movie
     */
    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }

    /**
     * Relacionamento com o modelo Serie
     */
    public function serie()
    {
        return $this->belongsTo(Serie::class);
    }
}

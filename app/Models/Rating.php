<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'movie_id',
        'series_id',
        'rating',
    ];

    // Relacionamento com o usuário
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacionamento com o filme (se houver)
    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }

    // Relacionamento com a série (se houver)
    public function serie()
    {
        return $this->belongsTo(Serie::class);
    }
}

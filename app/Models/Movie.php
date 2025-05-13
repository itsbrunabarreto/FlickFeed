<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Movie extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'release_year',
        'genre',
        'image',
    ];

    // Relacionamento com usuários que assistiram este filme
    public function watchedMovies()
    {
        return $this->hasMany(WatchedMovie::class);
    }

    // Relacionamento com avaliações
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Serie extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'release_year',
        'genre',
        'image',
    ];

    // Relacionamento com episódios da série
    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }

    // Relacionamento com avaliações da série
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}

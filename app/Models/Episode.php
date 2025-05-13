<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Episode extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'series_id',
        'season',
        'episode_number',
        'title',
        'air_date',
    ];

    // Relacionamento com a série
    public function series()
    {
        return $this->belongsTo(Serie::class); 
    }

    // Relacionamento com os usuários que assistiram este episódio
    public function watchedByUsers()
    {
        return $this->hasMany(WatchedEpisode::class);
    }
}

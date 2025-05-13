<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'name',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Filmes assistidos
    public function watchedMovies()
    {
        return $this->hasMany(WatchedMovie::class);
    }

    // Episódios assistidos
    public function watchedEpisodes()
    {
        return $this->hasMany(WatchedEpisode::class);
    }

    // Avaliações
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    // Listas
    public function lists()
    {
        return $this->hasMany(Lists::class);
    }
}

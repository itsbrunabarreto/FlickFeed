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

    public static function sendVerificationEmail($user)
    {
        $activateCode = bcrypt(Str::random(15));
        $user->remember_token = $activateCode;
        $user->save();
        $viewData['Nome'] = $user->name;
        $emailCode = $user->remember_token;
        $viewData['link'] = asset('/api/verify_account?token'.$emailCode);
        Mail::send('layouts.email_verification',env('APP_NAME'),$viewData, function($m) use($user){
            $m->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'));
            $m->to($user->email, $user->name)->subject('E-mail de Confirmação de Registro no Sistema');
        });
    }

    public static function sendEmailUserActivated($user){
        $viewData['Nome'] = $user->name;
        $viewData['link'] = asset('http://localhost:3000/login');
        Mail::send('layouts.email_verification',$viewData, function($m) use($user){
            $m->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'));
            $m->to($user->email, $user->name)->subject('Usuário Registrado e Liberado para Acesso');
        });
    }

    public static function sendEmailUserActivatedFailed($user){
        $viewData['Nome'] = $user->name;
        Mail::send('layouts.email_verification',$viewData, function($m) use($user){
            $m->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'));
            $m->to($user->email, $user->name)->subject('Usuário já está registrado no sistema ou link está expirado');
        });
    }
}

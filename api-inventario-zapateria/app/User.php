<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'usuarios';
    protected $primaryKey = 'usuario_id';
    protected $rememberTokenName = 'api_token';
    public $timestamps = false;

    protected $fillable = [
        'usuario_correo', 'usuario_clave', 'usuario_nombre', 'api_token'
    ];

    protected $hidden = [
        'usuario_clave'
    ];

    protected $casts = [];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
	protected $table = 'productos';
	protected $primaryKey = 'producto_id';
	public $timestamps = false;

	protected $fillable = [
		'producto_referencia', 'producto_nombre', 'producto_descripcion', 'producto_cantidad', 'producto_imagen',
		'producto_estado'
	];

	protected $hidden = [];

	protected $casts = [];
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarios extends Migration
{
	public function up()
	{
		Schema::create('usuarios', function (Blueprint $table) {
			$table->bigIncrements('usuario_id');
			$table->string('usuario_correo', 50);
			$table->string('usuario_clave');
			$table->string('usuario_nombre', 50);
			$table->string('api_token', 40);
		});
	}

	public function down()
	{
		Schema::dropIfExists('usuarios');
	}
}

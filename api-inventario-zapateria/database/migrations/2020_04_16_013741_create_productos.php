<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductos extends Migration
{
	public function up()
	{
		Schema::create('productos', function (Blueprint $table) {
			$table->bigIncrements('producto_id');
			$table->string('producto_referencia')->unique();
			$table->string('producto_nombre');
			$table->string('producto_descripcion');
			$table->string('producto_cantidad');
			$table->string('producto_imagen');
			$table->string('producto_estado',1);
		});
	}

	public function down()
	{
		Schema::dropIfExists('productos');
	}
}

<?php

Route::group(['prefix' => 'producto'], function(){
	Route::get('imagen/{referencia}', [
		'as' => 'webProductoImagen',
		'uses' => 'ProductoController@productoRutaImagen'
	]);
});
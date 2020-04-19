<?php

Route::group(['prefix' => 'producto'], function(){
	Route::get('imagen/{referencia}', [
		'as' => 'webProductoImagen',
		'uses' => 'ProductoController@productoRutaImagen'
	]);
});

Route::group(['prefix' => 'catalogo'], function(){
	Route::get('descargar', [
		'as' => 'webCatalogoDescargar',
		'uses' => 'CatalogoController@descargarCatalogo'
	]);
});
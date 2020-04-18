<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'usuario'], function(){
	Route::post('iniciarSesion', [
		'as' => 'apiIniciarSesion',
		'uses' => 'UsuarioController@apiAutenticarUsuario'
	]);

	Route::post('cerrarSesion', [
		'as' => 'apiCerrarSesion',
		'uses' => 'UsuarioController@apiCerrarSesionUsuario'
	]);
});

Route::group(['prefix' => 'producto'], function(){
	Route::middleware('auth:api')->post('buscar', [
		'as' => 'apiProductoBuscar',
		'uses' => 'ProductoController@buscarProductoPorReferencia'
	]);
	Route::middleware('auth:api')->post('guardar', [
		'as' => 'apiProductoGuardar',
		'uses' => 'ProductoController@guardarProducto'
	]);
});

Route::group(['prefix' =>'catalogo'], function(){
	Route::middleware('auth:api')->post('ver', [
		'as' => 'apiCatalogoVer',
		'uses' => 'CatalogoController@verCatalogo'
	]);
});


<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Image;

use App\Helpers\Utilitarias;
use App\Producto;

class CatalogoController extends Controller
{
	/*
	 * Controlador encargado de las operaciones relativas al catálogo..
	 */
	public function verCatalogo(Request $req){
		/*
		 * Consulta los productos para verlos en el catálogo.
		 */
		Utilitarias::escribirLog('Inicio intento ver catálogo');
		$codigoRespuesta = '';
		$jsonRespuesta = json_decode('{}');
		
		$productos = Producto::get();

		if(empty($productos)){
			//Productos no encontrados.
			Utilitarias::escribirLog('No hay productos');
			$codigoRespuesta = 200;
			$jsonRespuesta = [
				'error-mensaje' => 'No hay productos.',
				'error-codigo' => "CV-1"
			];
		}
		else{
			//Productos encontrados.
			Utilitarias::escribirLog('Cantidad productos encontrados -> ' . $productos->count());
			$codigoRespuesta = 200;
			$jsonRespuesta = [
				'productos' => $productos,
				'urlBaseImagenes' => url('producto/imagen/'),
				'exito-codigo' => "CV-2",
				'exito-mensaje' => "Se encontraron " . $productos->count() . " productos"
			];
		}
				
		Utilitarias::escribirLog('Fin intento de búsqueda de producto por referencia');
		return response()->json($jsonRespuesta, $codigoRespuesta);
	}
}

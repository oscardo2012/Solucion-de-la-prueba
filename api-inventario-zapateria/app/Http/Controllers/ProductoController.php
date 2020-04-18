<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Image;

use App\Helpers\Utilitarias;
use App\Producto;

class ProductoController extends Controller
{
	/*
	 * Controlador encargado de las operaciones relativas a los productos..
	 */
	public function buscarProductoPorReferencia(Request $req){
		/*
		 * Consulta los datos de un producto, buscando por el número de referencia.
		 */
		Utilitarias::escribirLog('Inicio intento de búsqueda de producto por referencia');
		$codigoRespuesta = '';
		$jsonRespuesta = json_decode('{}');
		if(empty($req->referencia)){
			//Sin parámetros
			Utilitarias::escribirLog('Referencia del producto vacía');
			$codigoRespuesta = 401;
			$jsonRespuesta = [
				'error-mensaje' => 'Referencia del producto vacía.',
				'error-codigo' => "PBR-1"
			];
		}
		else{
			//Con parámetros
			$producto = Producto::where([
				['producto_referencia',$req->referencia]
			])->first();

			if(empty($producto)){
				//Producto no encontrado.
				Utilitarias::escribirLog('Referencia de producto no encontrada -> ' . $req->referencia);
				$codigoRespuesta = 401;
				$jsonRespuesta = [
					'error-mensaje' => 'Referencia de producto no encontrada.',
					'error-codigo' => "PBR-2"
				];
			}
			else{
				//Producto no encontrado.
				Utilitarias::escribirLog('Referencia de producto encontrada -> ' . $req->referencia);
				$codigoRespuesta = 200;
				$jsonRespuesta = $producto;
				$jsonRespuesta['urlImagen'] = url('producto/imagen/') . '/' . $req->referencia;
			}
		}		
		Utilitarias::escribirLog('Fin intento de búsqueda de producto por referencia');
		return response()->json($jsonRespuesta, $codigoRespuesta);
	}

	public function productoRutaImagen($referencia){
		/*
		 * Retorna la imagen del producto
		 */
		Utilitarias::escribirLog('Inicio intento de búsqueda de la imagen producto por referencia');
		if(empty($referencia)){
			//Sin parámetros
			Utilitarias::escribirLog('Referencia del producto vacía');
			$rutaAlmacenamiento = storage_path('app/public/no-encontrada.jpg');
		}
		else{
			//Con parámetros
			$producto = Producto::where([
				['producto_referencia',$referencia]
			])->first();

			if(empty($producto)){
				//Producto no encontrado.
				Utilitarias::escribirLog('Referencia de producto no encontrada -> ' . $referencia);
				$rutaAlmacenamiento = storage_path('app/public/no-encontrada.jpg');
			}
			else{
				//Producto no encontrado.
				Utilitarias::escribirLog('Referencia de producto encontrada -> ' . $referencia);
				$rutaAlmacenamiento = storage_path('app/public/' . $producto->producto_imagen);
			}
		}
		Utilitarias::escribirLog('Fin intento de búsqueda de la imagen producto por referencia');
		return Image::make($rutaAlmacenamiento)->response();
	}

	public function guardarProducto(Request $req){
		/*
		 * Almacena los cambios en los productos, ya sea insertando o modificando
		 */
		Utilitarias::escribirLog('Inicio intento de guardar producto');
		$codigoRespuesta = '';
		$jsonRespuesta = json_decode('{}');
		if(empty($req->referencia) || empty($req->nombre) || empty($req->descripcion) || empty($req->imagenBase64) || empty($req->cantidad) || empty($req->estado)){
			//Parámetros incompletos
			Utilitarias::escribirLog('Parámetros vacíos');
			$codigoRespuesta = 401;
			$jsonRespuesta = [
				'error-mensaje' => 'Los parámetros están incompletos.',
				'error-codigo' => "GP-1"
			];
		}
		else{
			if(empty($req->id)){
				//Producto nuevo
				Utilitarias::escribirLog('Producto nuevo -> referencia -> ' . $req->referencia);
				$producto = new Producto();
				$producto->producto_referencia = $req->referencia;
			}
			else{
				//Modificar producto
				Utilitarias::escribirLog('Producto para modificar -> id -> ' . $req->id);
				$producto = Producto::where([
					['producto_id', '=' ,$req->id]
				])->first();
			}

			$rutaImagen = Utilitarias::guardarImagenBase64($req->imagenBase64, $req->referencia);
			$producto->producto_referencia = $req->referencia;
			$producto->producto_nombre = $req->nombre;
			$producto->producto_descripcion = $req->descripcion;
			$producto->producto_cantidad = $req->cantidad;
			$producto->producto_imagen = $rutaImagen;
			$producto->producto_estado = $req->estado;
			$producto->save();
			$codigoRespuesta = 200;
			$jsonRespuesta = [
				'exito-mensaje' => 'Producto guardado exitosamente.',
				'exito-codigo' => "GP-2",
				'catalogo' => Producto::get()
			];
		}
		Utilitarias::escribirLog('Fin intento de guardar producto');
		return response()->json($jsonRespuesta, $codigoRespuesta);
	}
}

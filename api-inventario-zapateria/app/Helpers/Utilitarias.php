<?php

namespace App\Helpers;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

class Utilitarias{
	/*
	 * Esta clase contiene las funciones que son trasversales a los demás procesos y que se usan varias veces.
	 */
	public static function escribirLog($mensaje, $tipo = "info", $nombreArchivo = "API"){
		/*
		 * Se encarga de escribir logs (registros).
		*/
		$logApi = new Logger('API');		
		$logApi->pushHandler(new StreamHandler(storage_path('logs/' . $nombreArchivo . '.log')), Logger::INFO);
		$infoLog = __CLASS__ . "->" . __FUNCTION__ . ":" . __LINE__ . " => ";

		switch($tipo){
			case 'emergency': 
				$logApi->emergency($infoLog . $mensaje);
				break;
			case 'alert': 
				$logApi->alert($infoLog . $mensaje);
				break;
			case 'critical': 
				$logApi->critical($infoLog . $mensaje);
				break;
			case 'error': 
				$logApi->error($infoLog . $mensaje);
				break;
			case 'warning': 
				$logApi->warning($infoLog . $mensaje);
				break;
			case 'notice': 
				$logApi->notice($infoLog . $mensaje);
				break;
			case 'debug': 
				$logApi->debug($infoLog . $mensaje);
				break;
			default: 
				$logApi->info($infoLog . $mensaje);
				break;
		}
	}

	public static function generarToken($longitud = 40){
		/*
		 * Retorna un string aleatorio con longitud de tamaño $longitud
		 */
		return str_random(40);
	}

	public static function guardarImagenBase64($imagenBase64, $numReferencia){
		/*
		 * Guarda un String en base64 en un archivo físico y retorna la ruta relativa guardada.
		 */
		$rutaRelativaImagen = 'productos/';
		$rutaAbsolutaImagen = $rutaAlmacenamiento = storage_path('app/public/');
		$rutaCompleta = "";
		$array = explode(";base64,",$imagenBase64);
		$datosImg = $array[1];
		$array = explode("/",$array[0]);
		$tipoImagen = $array[1];
		if(!is_dir($rutaAbsolutaImagen . $rutaRelativaImagen . $numReferencia . '/')){
			mkdir($rutaAbsolutaImagen . $rutaRelativaImagen . $numReferencia . '/');
		}
		$rutaCompleta = $rutaAbsolutaImagen . $rutaRelativaImagen . $numReferencia . '/' . $numReferencia . '.' . $tipoImagen;
		$contenidoImagen = base64_decode($datosImg);
		$archivo = fopen($rutaCompleta, "wb");
		fwrite($archivo, $contenidoImagen);
		fclose($archivo);
		return $rutaRelativaImagen . $numReferencia . '/' . $numReferencia . '.' . $tipoImagen;
	}
}
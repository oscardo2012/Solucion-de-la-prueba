<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Helpers\Utilitarias;
use App\User;

class UsuarioController extends Controller
{
	/*
	 * Controlador encargado de las operaciones relativas al usuario.
	 */
	public function apiAutenticarUsuario(Request $req){
		/*
		 * Valida el inicio de sesión del usuario por medio del API
		 * Si el inicio de sesión es correcto retorna los datos del usuario, incluido el token de sesión
		 * Si el inicio de sesión no es correcto, retorna un mensaje de error junto con un código para revisar dónde falló.
		 */
		Utilitarias::escribirLog('Inicio intento de inicio de sesión');
		$codigoRespuesta = '';
		$jsonRespuesta = json_decode('{}');
		if(empty($req->usuario) || empty($req->clave)){
			//Parámetros incompletos
			Utilitarias::escribirLog('Parámetros vacíos -> ' . $req->usuario);
			$codigoRespuesta = 401;
			$jsonRespuesta = [
				'error-mensaje' => 'Usuario o clave vacíos.',
				'error-codigo' => "UI-1"
			];
		}
		else{
			//Todos los parámetros tienen valor
			$usuario = User::where([
				['usuario_correo',$req->usuario],
				['usuario_clave',sha1($req->clave)]
			])->first();

			if(empty($usuario)){
				//No se encontró el usuario
				Utilitarias::escribirLog('Usuario no encontrado -> ' . $req->usuario);
				$codigoRespuesta = 401;
				$jsonRespuesta = [
					'error-mensaje' => 'Usuario o clave incorrectos.',
					'error-codigo' => "UI-2"
				];
			}
			else{
				//Usuario encontrado
				Utilitarias::escribirLog('Usuario encontrado -> ' . $req->usuario);
				$usuario->api_token = Utilitarias::generarToken();
				$usuario->save();
				$codigoRespuesta = 200;
				$jsonRespuesta = $usuario;
			}
		}
		Utilitarias::escribirLog('Fin intento de inicio de sesión');
		return response()->json($jsonRespuesta, $codigoRespuesta);
	}

	public function apiCerrarSesionUsuario(Request $req){
		/*
		 * Limpia el campo de api_token para el usuario
		 * Si el cierre de sesión es correcto retorna un mensaje avisando el cierre.
		 * Si el cierre de sesión no es correcto, retorna un mensaje de error.
		 */
		Utilitarias::escribirLog('Inicio intento de cierre de sesión');
		$codigoRespuesta = '';
		$jsonRespuesta = json_decode('{}');
		if(empty($req->usuarioId) || empty($req->api_Token)){
			//Parámetros incompletos
			Utilitarias::escribirLog('Parámetros vacíos -> ' . $req->usuarioId);
			$codigoRespuesta = 401;
			$jsonRespuesta = [
				'error-mensaje' => 'Id o apiToken vacíos.',
				'error-codigo' => "UC-1"
			];
		}
		else{
			//Todos los parámetros tienen valor
			$usuario = User::where([
				['usuario_id',$req->usuarioId],
				['api_token',$req->api_Token]
			])->first();

			if(empty($usuario)){
				//No se encontró el usuario
				Utilitarias::escribirLog('Usuario no encontrado -> ' . $req->usuarioId);
				$codigoRespuesta = 401;
				$jsonRespuesta = [
					'error-mensaje' => 'Usuario no encontrado.',
					'error-codigo' => "UC-2"
				];
			}
			else{
				//Usuario encontrado
				Utilitarias::escribirLog('Usuario encontrado -> ' . $req->usuarioId);
				$usuario->api_token = "";
				$usuario->save();
				$codigoRespuesta = 200;
				$jsonRespuesta = [
					'exito-mensaje' => 'Sesión cerrara exitosamente.',
					'exito-codigo' => "UC-3"
				];
			}
		}
		Utilitarias::escribirLog('Fin intento de cierre de sesión');
		return response()->json($jsonRespuesta, $codigoRespuesta);
	}
}

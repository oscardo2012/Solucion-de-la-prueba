const Login = {
	name: 'Login',
	template: `
		<div class="container">
			<div class="middle-box text-center loginscreen animated fadeInDown">
				<div>
					<h3 class="letra-blanca">Bienvenido a la Zapatería</h3>
					<p class="letra-blanca">
						Inicie sesión para poder usar la plataforma.
					</p>
					<form class="m-t" role="form" action="index.html">
						<div class="form-group" :class="{'has-error': !validaciones.usuario}">
							<input
								v-model="usuario_correo"
								type="email"
								class="form-control"
								placeholder="Correo Electrónico"
								required="">
						</div>
						<div class="form-group" :class="{'has-error': !validaciones.clave}">
							<input
								v-model="usuario_clave"
								type="password"
								class="form-control"
								placeholder="Contraseña"
								required="">
						</div>
						<button
							v-on:click="iniciarSesion()"
							type="button"
							class="btn btn-primary block full-width m-b">
							Iniciar Sesión
						</button>
					</form>
				</div>

				<div class="alert alert-danger" role="alert" v-show="(errorMensaje != '')" v-html="errorMensaje">
				</div>
			</div>
		</div>
	`,
	data: function(){
		return{
			usuario_correo: "",
			usuario_clave: "",
			errorMensaje: "",
			validaciones:{
				usuario: true,
				clave: true
			}
		}
	},
	mounted: function(){
		console.log("LoginComponente mounted");
		if(localStorage.getItem('apiToken')){
			this.$router.push({name:'ruta-ingresar-producto'});
		}
	},
	methods:{
		iniciarSesion(){
			let mensaje = "";
			this.validaciones.usuario = true;
			this.validaciones.clave = true;
			if(this.usuario_correo.trim() == ""){
				this.validaciones.usuario = false;
				mensaje += 'El usuario no puede estar vacío.<br>';
			}
			if(this.usuario_clave.trim() == ""){
				this.validaciones.clave = false;
				mensaje += 'La clave no puede estar vacía.<br>';
			}

			if(mensaje != ""){
				this.errorMensaje = mensaje;
			}
			else{
				this.$emit('mostrar-modal',true);
				this.errorMensaje = "";
				axios.post(urlAPI + "/usuario/iniciarSesion",{
					usuario: this.usuario_correo,
					clave: this.usuario_clave
				})
				.then(respuesta => {
					let datosRespuesta = respuesta.data;
					this.$emit('mostrar-modal',false);
					if(typeof datosRespuesta.api_token != "undefined" && datosRespuesta.api_token != ""){
						localStorage.setItem("usuarioId",datosRespuesta.usuario_id);
						localStorage.setItem("usuarioCorreo",datosRespuesta.usuario_correo);
						localStorage.setItem("usuarioNombre",datosRespuesta.usuario_nombre);
						localStorage.setItem("apiToken",datosRespuesta.api_token);
						this.$router.push({name:'ruta-ingresar-producto'});
					}
					else{
						localStorage.clear();
						this.errorMensaje = 'Se ha presentado un error, inténtelo nuevamente';
					}
				})
				.catch(e => {
					if(e.message != 'Network Error'){
						let objRespuesta = JSON.parse(e.request.response);
						localStorage.clear()
						this.errorMensaje = objRespuesta['error-mensaje'] 
											+ "<br> Código error: " + objRespuesta['error-codigo'];
					}
					else{
						this.errorMensaje = "No se puede establecer conexión con el API.";
					}
					this.$emit('mostrar-modal',false);
					console.log(e);
				});
			}
		}
	},
	watch:{}
}
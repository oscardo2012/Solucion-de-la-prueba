Vue.component('plantilla-principal',{
	name: "PlantillaPrincipalSlot",
	props: ["nivel1Productos","nivel2IngresarProductos","nivel1Catalogo", "nivel2VerCatalogo", "nivel2DescargarCatalogo"],
	template: `
		<div id="wrapper">
			<nav class="navbar-default navbar-static-side" role="navigation">
				<div class="sidebar-collapse">
					<ul class="nav" id="side-menu">
						<li class="nav-header">
							<div class="dropdown profile-element">
								<span>
									<img alt="image" class="img-circle" src="imagenes/img-perfil.png" />
								</span>
								<span class="clear letra-blanca">
									<span class="block m-t-xs">
										<strong class="font-bold">
											<slot name="nombreUsuario"></slot>
										</strong>
									</span>
								</span>
							</div>
							<div class="logo-element">
								ZP
							</div>
						</li>

						<li :class="nivel1Productos">
							<a>
								<i class="fa fa-shopping-basket"></i>
								<span class="nav-label">Productos</span>
								<span class="fa arrow"></span>
							</a>
							<ul class="nav nav-second-level">
								<li :class="nivel2IngresarProductos">
									<a v-on:click="irA('ruta-ingresar-producto')">Ingresar/Editar</a>
								</li>
							</ul>
						</li>

						<li :class="nivel1Catalogo">
							<a>
								<i class="fa fa-book"></i>
								<span class="nav-label">Catálogo de Productos</span>
								<span class="fa arrow"></span>
							</a>
							<ul class="nav nav-second-level">
								<li :class="nivel2VerCatalogo"><a  v-on:click="irA('ruta-ver-catalogo')">Ver Catálogo</a></li>
								<li :class="nivel2DescargarCatalogo"><a v-on:click="descargarCatalogo()">Descargar Catálogo</a></li>
							</ul>
						</li>

						<li>
							<a v-on:click="cerrarSesion()">
								<i class="fa fa-sign-out-alt"></i>
								<span class="nav-label">Cerrar Sesión</span>
							</a>
						</li>
							
					</ul>
				</div>
			</nav>

			<div id="page-wrapper" class="gray-bg">
				<div class="row border-bottom">
					<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
						<div class="navbar-header">
							<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#">
								<i class="fa fa-bars"></i>
							</a> 
						</div>
					</nav>
				</div>

				<div class="row wrapper border-bottom white-bg page-heading">
					<div class="col-sm-12">
						<h2>
							<slot name="tituloPagina"></slot>
						</h2>
					</div>
				</div>

				<div class="wrapper wrapper-content">
					<slot name="contenidoPagina"></slot>
				</div>
				
				<div class="footer">
					<div>
						<strong>Desarrollado por</strong> Oscar Fernando Espinosa Rocha
					</div>
				</div>
			</div>
		</div>
	`,
	data: function(){
		return {}
	},
	methods:{
		mostrarModal(valor){
			this.$emit('mostrar-modal',valor);
		},
		irA(nombreRuta){
			if(nombreRuta != this.$route.name){
				this.$router.push({name: nombreRuta});
			}
		},
		descargarCatalogo(){
			window.open(urlWEB + "/catalogo/descargar","_blank");
		},
		cerrarSesion(){
			this.mostrarModal(true);
			axios.post(urlAPI + "/usuario/cerrarSesion",{
				usuarioId: localStorage.getItem('usuarioId'),
				api_Token: localStorage.getItem('apiToken')
			})
			.then(respuesta => {
				let datosRespuesta = respuesta.data;
				this.mostrarModal(false);
				localStorage.clear();
				this.irA('ruta-raiz');
			})
			.catch(e => {
				let errorMensaje = "";
				if(e.message != 'Network Error'){
					let objRespuesta = JSON.parse(e.request.response);
					localStorage.clear()
					errorMensaje = objRespuesta['error-mensaje'] 
										+ "\n Código error: " + objRespuesta['error-codigo'];
				}
				else{
					errorMensaje = "No se puede establecer conexión con el API.";
				}
				this.mostrarModal(false);
				console.log(e);
				localStorage.clear();
				this.irA('ruta-raiz');
			});
		}
	}
});
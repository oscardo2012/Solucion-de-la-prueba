const VerCatalogo = {
	name: 'VerCatalogo',
	template: `
			<div>
				<plantilla-principal nivel1Catalogo="active" nivel2VerCatalogo="active">
					<div slot="tituloPagina">
						<p>Ver catálogo de productos</p>
						<small>Haga clic sobre un producto</small>
					</div>
					<div slot="nombreUsuario">{{usuario_nombre}}</div>
					<div slot="contenidoPagina">
						<div class="row">
							<div class="col-lg-12">
								<div class="ibox float-e-margins">
									<div class="ibox-content">
										<form role="search">
											<div class="form-group">
												<input
													type="text" placeholder="Buscar en el catálogo"
													class="form-control"
													v-on:keypress="buscarEnCatalogo($event)">
											</div>
										</form>
									</div>
									<div class="wrapper wrapper-content animated fadeInRight">
										<div class="row">
											<div class="col-lg-4" v-for="producto in catalogo">
												<div class="contact-box">
													<a v-on:click="verProducto(producto.producto_referencia)">
														<div class="col-sm-4">
															<div class="text-center">
																<img
																	alt="image"
																	class="img-circle m-t-xs img-responsive"
																	:src="urlImagenes + '/' + producto.producto_referencia">
																<div class="m-t-xs font-bold">
																	{{producto.producto_nombre}}
																</div>
															</div>
														</div>
														<div class="col-sm-8">
															<h3>
																<strong>Referencia:</strong>
																<i class="fa fa-hashtag"></i>
																{{producto.producto_referencia}}
															</h3>
															<address>
																<strong>Estado: </strong><span :class="'estado-prod-'+producto.producto_estado">{{producto.producto_estado}}</span><br>
																<strong>Cantidad: </strong>{{producto.producto_cantidad}}<br>
																<strong>Descripción: </strong>{{producto.producto_descripcion}}
															</address>
														</div>
														<div class="clearfix"></div>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</plantilla-principal>
				
				<div class="modal fade" id="modalDatosproducto">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h3 class="modal-title">Información producto ref: {{productoDetalles.producto_referencia}}</h3>
							</div>
							<div class="modal-body">
								
								<form method="get" class="form-horizontal" id="formProducto">
									<div class="form-group">
										<label class="col-sm-2 control-label">Referencia: </label>
										<p class="form-control-static col-sm-10">{{productoDetalles.producto_referencia}}</p>
									</div>
									
									<div class="form-group">
										<label class="col-sm-2 control-label">Nombre: </label>
										<p class="form-control-static col-sm-10">{{productoDetalles.producto_nombre}}</p>
									</div>

									<div class="form-group">
										<label class="col-sm-2 control-label">Descripción: </label>
										<p class="form-control-static col-sm-10">{{productoDetalles.producto_descripcion}}</p>
									</div>
									
									<div class="form-group">
										<label class="col-sm-2 control-label">Cantidad: </label>
										<p class="form-control-static col-sm-10">{{productoDetalles.producto_cantidad}}</p>
									</div>

									<div class="form-group">
										<label class="col-sm-2 control-label">Estado: </label>
										<p class="form-control-static col-sm-10">
											<select v-model="productoDetalles.producto_estado">
												<option value="A">Activo</option>
												<option value="I">Inactivo</option>
											</select>
										</p>
									</div>

									<div class="form-group text-center">
										<label class="col-sm-2 control-label">Imagen: </label>
										<p class="form-control-static col-sm-10 text-left">
											<img
												id="imgProducto"
												class="vista-previa-imagen"
												crossOrigin
												:src="urlImagenes + '/' + productoDetalles.producto_referencia"/>
											<canvas id="imgCanvas" class="hidden"/>
										</p>
									</div>
								</form>

							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								<button type="button" class="btn btn-primary" v-on:click="guardarCambioEstado()">Guardar Cambios</button>
							</div>
						</div>
					</div>
				</div>

			</div>
	`,
	data: function(){
		return{
			usuario_nombre: localStorage.getItem('usuarioNombre'),
			urlImagenes: '',
			productoDetalles:{},
			catalogo:{}
		}
	},
	mounted: function(){
		console.log("VerCatalogoComponente mounted");

		if(!localStorage.getItem('apiToken')){
			this.$router.push({name:'ruta-raiz'});
		}
		else{
			//Buscar los productos y mostrarlos
			this.mostrarModal(true);
			axios.post(urlAPI + "/catalogo/ver",{
				api_token: localStorage.getItem("apiToken")
			})
			.then(respuesta => {
				let datosRespuesta = respuesta.data;
				this.mostrarModal(false);
				if(typeof datosRespuesta['exito-mensaje'] != "undefined" && datosRespuesta['exito-mensaje'] != ""){
					this.catalogo = datosRespuesta.productos;
					this.urlImagenes = datosRespuesta.urlBaseImagenes;
				}
				else{
					this.catalogo = "";
					alert(datosRespuesta['error-mensaje']);
				}
			})
			.catch(e => {
				if(e.message != 'Network Error'){
					
				}
				else{
					alert("No se puede establecer conexión con el API.");
				}
				this.mostrarModal(false);
				console.log(e);
			});
		}
	},
	methods:{
		mostrarModal(valor){
			this.$emit('mostrar-modal',valor);
		},
		buscarEnCatalogo(evento){
			console.log(evento.target.value);
		},
		verProducto(referencia){
			for(producto of this.catalogo){
				if(referencia == producto.producto_referencia){
					this.productoDetalles = producto;
					let img = document.getElementById("imgProducto");
					img.classList.remove("vista-previa-imagen");
					let imgH = img.height,
						imgW = img.width;
					img.classList.add("vista-previa-imagen");

					let can = document.getElementById("imgCanvas"),
						ctx = can.getContext("2d");
					ctx.drawImage(img, 0, 0, imgH, imgW);
					this.productoDetalles.imagenBase64 = can.toDataURL();
					$("#modalDatosproducto").modal("show");
					break;
				}
			}
		},
		guardarCambioEstado(){
			this.$emit('mostrar-modal',true);
			axios.post(urlAPI + "/producto/guardar",{
				id: this.productoDetalles.producto_id,
				referencia: this.productoDetalles.producto_referencia,
				nombre: this.productoDetalles.producto_nombre,
				descripcion: this.productoDetalles.producto_descripcion,
				cantidad: this.productoDetalles.producto_cantidad,
				estado: this.productoDetalles.producto_estado,
				imagenBase64: this.productoDetalles.imagenBase64,
				api_token: localStorage.getItem("apiToken")
			})
			.then(respuesta => {
				let datosRespuesta = respuesta.data;
				this.$emit('mostrar-modal',false);
				if(typeof datosRespuesta["exito-mensaje"] != "undefined" && datosRespuesta["exito-mensaje"] != ""){
					//Producto encontrado
					this.catalogo = datosRespuesta.catalogo;
					this.productoDetalles = {};
					$("#modalDatosproducto").modal("hide");
					alert(datosRespuesta["exito-mensaje"]);
				}
				else{
					alert(datosRespuesta["error-mensaje"]);
				}
			})
			.catch(e => {
				let formImagen = document.getElementById("formImagen"),
					datosRespuesta = e.response.data;
				formImagen.reset();
				if(e.message != 'Network Error'){
					alert(datosRespuesta["error-mensaje"]);
				}
				else{
					alert("No se puede establecer conexión con el API.");
				}
				this.$emit('mostrar-modal',false);
				console.log(e);
			});
		},
	},
	watch:{

	}
};
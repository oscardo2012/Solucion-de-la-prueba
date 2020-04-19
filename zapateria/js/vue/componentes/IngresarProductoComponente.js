const IngresarProducto = {
	name: 'IngresarProducto',
	template: `
			<plantilla-principal @mostrar-modal="mostrarModal" nivel1Productos="active" nivel2IngresarProductos="active">
				<div slot="tituloPagina">{{accion}} Producto</div>
				<div slot="nombreUsuario">{{usuario_nombre}}</div>
				<div slot="contenidoPagina">
					<div class="row">
						<div class="col-lg-12">
							<div class="ibox float-e-margins">
								<div class="ibox-content">
									<form class="form-horizontal" id="formProducto">
										<div class="form-group">
											<label class="col-sm-2 control-label">Referencia</label>
											<div class="col-sm-10">
												<input
													type="text"
													class="form-control"
													v-on:change="buscarReferencia()"
													v-model="producto.referencia">
													<span class="help-block m-b-none">{{mensajeReferenciaNoModificable}}</span>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-sm-2 control-label">Nombre</label>
											<div class="col-sm-10">
												<input type="text" class="form-control" v-model="producto.nombre">
											</div>
										</div>

										<div class="form-group">
											<label class="col-sm-2 control-label">Descripción</label>
											<div class="col-sm-10">
												<textarea class="form-control" cols="30" rows="3" v-model="producto.descripcion">
												</textarea>
											</div>
										</div>
										
										<div class="form-group">
											<label class="col-sm-2 control-label">Cantidad</label>
											<div class="col-sm-10">
												<input
													type="number"
													min="0"
													step="1"
													class="form-control"
													v-on:keypress="cantidadKeyPress($event)"
													v-model="producto.cantidad">
											</div>
										</div>
										
										
										<div class="form-group">
											<label class="col-sm-2 control-label">Estado</label>
											<div class="col-sm-10">
												<select v-model="producto.estado">
													<option value="A">Activo</option>
													<option value="I">Inactivo</option>
												</select>
											</div>
										</div>


										<div class="form-group text-center">
											<label class="col-sm-2 control-label">Imagen</label>
											<div class="col-sm-5">
												<form id="formImagen">
													<input type="file" class="form-control" v-on:change="cargaImagen($event)">
												</form>
											</div>
											<div class="col-sm-5">
												<img
													id="imgProducto"
													class="vista-previa-imagen"
													crossOrigin
													v-bind:src="producto.imagenUrl"
													v-on:load="imgProductoCargo()"
													/>
												<canvas id="imgCanvas" class="hidden"/>
											</div>
										</div>

										<div class="form-group">
											<div class="col-sm-4 col-sm-offset-2">
												<button
													class="btn btn-danger"
													type="button"
													v-on:click="cancelar()">
														Cancelar
												</button>
												<button
													class="btn btn-info"
													type="button"
													v-on:click="guardarProducto()">
														Guardar
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</plantilla-principal>
		`,
	data: function(){
		return{
			accion: 'Ingresar',
			usuario_nombre: localStorage.getItem('usuarioNombre'),
			mensajeReferenciaNoModificable: '',
			producto:{
				id: "",
				referencia: "",
				nombre: "",
				descripcion: "",
				cantidad: 0,
				estado: "A",
				imagenUrl: "",
				imagenBase64: ""
			}
		}
	},
	mounted: function(){
		console.info("IngresarProductoComponente montado")
		if(!localStorage.getItem('apiToken')){
			this.irA('ruta-raiz');
		}
	},
	methods: {
		mostrarModal(valor){
			this.$emit('mostrar-modal',valor);
		},
		cantidadKeyPress(evento){
			evento = (evento) ? evento : window.event;
			var charCode = (evento.which) ? evento.which : evento.keyCode;
			if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
				evento.preventDefault();
			} else {
				return true;
			}
		},
		buscarReferencia(){
			if(this.producto.referencia.trim() != ""){
				this.mostrarModal(true);
				axios.post(urlAPI + "/producto/buscar",{
					referencia: this.producto.referencia,
					api_token: localStorage.getItem("apiToken")
				})
				.then(respuesta => {
					let datosRespuesta = respuesta.data,
						formImagen = document.getElementById("formImagen");
					formImagen.reset();
					this.mostrarModal(false);
					if(typeof datosRespuesta.producto_id != "undefined" && datosRespuesta.producto_id != ""){
						//Producto encontrado
						this.producto.id = datosRespuesta.producto_id;
						this.producto.nombre = datosRespuesta.producto_nombre;
						this.producto.descripcion = datosRespuesta.producto_descripcion;
						this.producto.cantidad =datosRespuesta.producto_cantidad;
						this.producto.imagenUrl = datosRespuesta.urlImagen;
						this.producto.estado = datosRespuesta.producto_estado;
						this.producto.imagenBase64 = "";
						this.accion = 'Modificar';
						this.mensajeReferenciaNoModificable = 'La referencia no es modificable';
					}
					else{
						//Producto no encontrado
						this.producto.id = "";
						this.producto.nombre = "";
						this.producto.descripcion = "";
						this.producto.cantidad ="";
						this.producto.imagenUrl = "";
						this.producto.estado = "A";
						this.producto.imagenBase64 = "";
						this.accion = 'Ingresar';
						this.mensajeReferenciaNoModificable = '';
					}
				})
				.catch(e => {
					//Como el aì responde un código 401 si no encuentra la referencia, se ejecuta el catch.
					let formImagen = document.getElementById("formImagen");
					formImagen.reset();
					if(e.message != 'Network Error'){
						this.producto.id = "";
						this.producto.nombre = "";
						this.producto.descripcion = "";
						this.producto.cantidad = "";
						this.producto.estado = "A";
						this.producto.imagenUrl = "";
						this.producto.imagenBase64 = "";
						this.accion = 'Ingresar';
						this.mensajeReferenciaNoModificable = '';
					}
					else{
						alert("No se puede establecer conexión con el API.");
					}
					this.mostrarModal(false);
					console.log(e);
				});
			}
		},
		cancelar(){
			let formImagen = document.getElementById("formImagen");
			formImagen.reset();
			this.accion = 'Ingresar';
			this.mensajeReferenciaNoModificable = '';
			this.producto.id = "";
			this.producto.referencia = "";
			this.producto.nombre = "";
			this.producto.descripcion = "";
			this.producto.estado = "A";
			this.producto.cantidad = 0;
			this.producto.imagenUrl = "";
			this.producto.imagenBase64 = "";
		},
		guardarProducto(){
			this.mostrarModal(true);
			axios.post(urlAPI + "/producto/guardar",{
					id: this.producto.id,
					referencia: this.producto.referencia,
					nombre: this.producto.nombre,
					descripcion: this.producto.descripcion,
					cantidad: this.producto.cantidad,
					estado: this.producto.estado,
					imagenBase64: this.producto.imagenBase64,
					api_token: localStorage.getItem("apiToken")
				})
				.then(respuesta => {
					let datosRespuesta = respuesta.data,
						formProducto = document.getElementById("formProducto");
					formProducto.reset();
					this.mostrarModal(false);
					if(typeof datosRespuesta["exito-mensaje"] != "undefined" && datosRespuesta["exito-mensaje"] != ""){
						//Producto encontrado
						this.producto.referencia = "";
						this.producto.id = "";
						this.producto.nombre = "";
						this.producto.descripcion = "";
						this.producto.cantidad = "";
						this.producto.estado = "A";
						this.producto.imagenUrl = "";
						this.producto.imagenBase64 = "";
						this.accion = 'Ingresar';
						this.mensajeReferenciaNoModificable = '';
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
					this.mostrarModal(false);
					console.log(e);
				});
		},
		cargaImagen(evento){
			let referencia = this,
				lectorDeImagen = new FileReader(),
				archivo = evento.target.files[0];
			lectorDeImagen.readAsDataURL(archivo);
			lectorDeImagen.onload = function () {
				referencia.producto.imagenUrl = referencia.producto.imagenBase64 = lectorDeImagen.result;
			};
			lectorDeImagen.onerror = function (error) {
				console.log('Error: ', error);
			};
		},
		imgProductoCargo(){
			if(this.producto.imagenBase64 == ""){
				let img = document.getElementById("imgProducto");
				img.classList.remove("vista-previa-imagen");
				let imgH = img.height,
					imgW = img.width;
				img.classList.add("vista-previa-imagen");

				let can = document.getElementById("imgCanvas"),
					ctx = can.getContext("2d");
				ctx.drawImage(img, 0, 0, imgH, imgW);
				this.producto.imagenBase64 = can.toDataURL();
			}
		}
	},
	watch: {}
}
const urlAPI = "http://localhost:8000/api";
const router = new VueRouter({
	base: "rutas",
	routes:[
		{
			path: '/',
			name: 'ruta-raiz',
			component: Login
		},
		{
			path: '/producto-ingresar',
			name: 'ruta-ingresar-producto',
			component: IngresarProducto
		},
		{
			path: '/catalogo-ver',
			name: 'ruta-ver-catalogo',
			component: VerCatalogo
		}
	]
});

var app = new Vue({
	el: "#app",
	router,
	data:{
		modalMostrar: false,
	},
	methods:{
		actualizarEstadoModal(valor){
			this.modalMostrar = valor;
		},
	}
});
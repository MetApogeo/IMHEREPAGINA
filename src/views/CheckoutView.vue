<template>
	<body>
		<div class="container" >
			<div v-if="listaCarrito.length > 0">
				<br><br><br><br><br>
				<h1>Checkout</h1>
				<div class="row py-5" style="margin-top: 100px; color:black; background-color: #424242; border-radius: 20px; color:white">
					<div  v-for="producto in listaCarrito" :key="producto.id" class="col-xs-12 producto-container" >
						<div class="row">
							<div class="col-md-4">
							<img class="card-img-top producto-img" :src="'http://127.0.0.1:8000/api/producto/foto/'+producto.imagen"  alt="Card image cap" style="width: 60%; ">
							</div>
							<div class="col-md-6">
								<div class="row producto-nombre">
									{{ producto.nombre }}
								</div>
								<div class="row producto-descripcion">
									{{ producto.descripcion }}
								</div>
							</div>
							<div class="col-md-2 producto-precio">${{ producto.precio }}</div>
						</div>
					</div>
				</div>
				<div class="row py-3">
					<div class="col-md-6">
						
					</div>
					<div class="col-md-6 text-end">
						<!-- Mostrar el precio total -->
						<p class="fs-4">Precio total: ${{ totalCarrito }}</p>
					</div>
				</div>
				<PaymentForm :listaCarrito="listaCarrito"/>
				</div>
				<div v-else>
				<p>El carrito está vacío.</p>
				<br>
				<button @click="goProductList">Ir a lista de Productos</button>
			</div>	
		</div>
	</body>
	
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm.vue';

const listaCarrito = ref([]);
const totalCarrito = ref(0);

const router = useRouter();

const calcularPrecioTotal = () => {
    console.log("Lista de productos:", listaCarrito.value);
    totalCarrito.value = listaCarrito.value.reduce((total, producto) => {
        console.log("Precio del producto:", producto.precio);
        return total + parseFloat(producto.precio);
    }, 0).toFixed(2);
    console.log("Total del carrito:", totalCarrito.value);
}

// Llama a la función consultarProductos cuando el componente se monta
onMounted(() => {
	const checkoutData = localStorage.getItem('checkout');
	if (checkoutData) {
		listaCarrito.value = JSON.parse(checkoutData);
	}
	console.log(listaCarrito.value)
	calcularPrecioTotal();
});

const goProductList = () => {
  // Navegar a la lista de productos
	router.push({ name: 'tienda' });
};


</script>

<style scoped>
/* Primera parte */
body{
  background: linear-gradient(to bottom, #000000, #424242);
  color: #ffffff;
}

/* Estilos para la lista de productos en el carrito */
.producto-container {
  border-bottom: 1px solid #444444; /* Borde entre elementos */
  padding: 15px 0; /* Espaciado interno */
}

.producto-img {
  max-width: 100px; /* Ancho máximo de la imagen */
  height: auto; /* Altura automática para mantener la proporción */
  border-radius: 5px; /* Bordes redondeados */
  margin-left: 60px;
}

.producto-info {
  padding-left: 15px; /* Espaciado a la izquierda */
}

.producto-nombre {
  font-size: 18px; /* Tamaño de fuente del nombre del producto */
  font-weight: bold; /* Negrita para el nombre */
}

.producto-descripcion {
  font-size: 14px; /* Tamaño de fuente de la descripción */
  margin-top: 5px; /* Margen superior */
  color: #999999; /* Color de texto gris para descripción */
  font-weight: 400;
}

.producto-precio {
  font-size: 16px; /* Tamaño de fuente del precio */
  margin-top: 10px; /* Margen superior */
}

.eliminar-btn {
  background-color: #ff4d4d; /* Color de fondo rojo para el botón eliminar */
  color: #ffffff; /* Texto blanco */
  border: none; /* Sin borde */
  padding: 5px 10px; /* Espaciado interno */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cursor de puntero al pasar sobre el botón */
}

.eliminar-btn:hover {
  background-color: #cc0000; /* Color de fondo rojo más oscuro al pasar sobre el botón */
}

/* Estilos para los botones de acción */
.btn {
  margin-top: 20px; /* Margen superior */
  padding: 10px 20px; /* Espaciado interno */
  font-size: 16px; /* Tamaño de fuente */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cursor de puntero */
}

.btn-danger {
  background-color: #ff4d4d; /* Color de fondo rojo */
  border: none; /* Sin borde */
  color: #ffffff; /* Texto blanco */
}

.btn-danger:hover {
  background-color: #cc0000; /* Color de fondo rojo más oscuro al pasar sobre el botón */
}

.btn-primary {
  background-color: #4d79ff; /* Color de fondo azul */
  border: none; /* Sin borde */
  color: #ffffff; /* Texto blanco */
}

.btn-primary:hover {
  background-color: #0052cc; /* Color de fondo azul más oscuro al pasar sobre el botón */
}

/* Estilos adicionales para los elementos de tarjeta */
#card-number,
#expiry,
#cvc {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
}
</style>
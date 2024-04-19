<template>
	<body>
		<div class="container">
			<div v-if="listaCarrito.length > 0">
			<br><br><br><br><br>
			<h1>Checkout</h1>
			<div class="row py-5 checkout-container">
				<div v-for="producto in listaCarrito" :key="producto.id" class="col-md-6 col-lg-4 col-xl-3">
					<div class="producto-card">
						<img class="card-img-top producto-img" :src="'http://127.0.0.1:8000/api/producto/foto/'+producto.imagen"  alt="Card image cap">
						<div class="producto-info">
						<div class="producto-nombre">{{ producto.nombre }}</div>
						<div class="producto-descripcion">{{ producto.descripcion }}</div>
						<div class="producto-precio">${{ producto.precio }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row py-3">
				<div class="col-md-6"></div>
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
				<button	button @click="goProductList" class="btn btn-primary">Ir a lista de Productos</button>
			</div>
		</div>
		<br><br>
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

.container {
  padding: 20px;
}

.checkout-container {
  background-color: #424242;
  border-radius: 20px;
  color: white;
}

.producto-card {
  border-bottom: 1px solid #444444;
  padding: 15px 0;
}

.producto-img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.producto-info {
  padding-left: 15px;
}

.producto-nombre {
  font-size: 18px;
  font-weight: bold;
}

.producto-descripcion {
  font-size: 14px;
  margin-top: 5px;
  color: #999999;
}

.producto-precio {
  font-size: 16px;
  margin-top: 10px;
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
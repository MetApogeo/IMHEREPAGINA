<template>
	<body>
		<div class="container" >
			<div v-if="listaCarrito.length > 0">
				<br><br><br><br><br>
				<h1>Checkout</h1>
				<p>Total: ${{ total }}</p>
				<form @submit.prevent="processPayment">
					<div id="card-element">
					<!-- Se montarán los elementos de Stripe aquí -->
					</div>
					<button :disabled="loading">
					{{ loading ? 'Procesando...' : 'Pagar' }}
					</button>
				</form>
				<div v-if="loading" class="loading-overlay">
					<div class="spinner-border text-primary" role="status">
					<span class="sr-only">Cargando...</span>
					</div>
				</div>
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
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// Variable reactiva para almacenar la lista de productos y el carrito
const listaProductos = ref([]);
const listaCarrito = ref([]);
const loading = ref(false);
const stripe = ref(null);
const card = ref(null);
const total = ref(0);

const consultarProductos = async () => {
	try {
		const response = await axios.get('http://127.0.0.1:8000/api/producto');
		listaProductos.value = response.data;

		// Consultar el carrito desde localStorage y filtrar los productos
		const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
		listaCarrito.value = listaProductos.value.filter(producto => carrito.includes(producto.id));
	} catch (error) {
		console.error('Error al obtener productos:', error);
		// Aquí podrías manejar el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario
	}
};

const eliminarCarrito = (id) => {
	try {
		let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
		// Filtrar el ID del producto a eliminar y guardar el carrito actualizado
		carrito = carrito.filter(itemId => itemId !== id);
		localStorage.setItem('carrito', JSON.stringify(carrito));
		// Actualizar la lista de productos en el carrito
		listaCarrito.value = listaCarrito.value.filter(producto => producto.id !== id);
	} catch (error) {
		console.error('Error al eliminar producto del carrito:', error);
		// Aquí podrías manejar el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario
	}
};

const eliminarTodo = () => {
	try {
		// Eliminar todos los elementos del carrito en localStorage
		localStorage.removeItem('carrito');
		// Limpiar la lista de productos en el carrito
		listaCarrito.value = [];
	} catch (error) {
		console.error('Error al eliminar todo el carrito:', error);
		// Manejar el error según sea necesario
	}
};

const calcularPrecioTotal = () => {
	total.value = listaCarrito.value.reduce((acc, producto) => acc + producto.precio, 0).toFixed(2);
};

// Llama a la función consultarProductos cuando el componente se monta
onMounted(() => {
	consultarProductos();
});

watch(listaCarrito, () => {
	calcularPrecioTotal();
});

const processPayment = async () => {
	loading.value = true;
	try {
		// Aquí deberías enviar los detalles del pedido al servidor para procesar el pago
		console.log('Detalle del pedido:', listaCarrito.value);
		console.log('Total:', total.value);
		console.log('Pago procesado');
	} catch (error) {
		console.error('Error al procesar el pago:', error.message);
	} finally {
		loading.value = false;
	}	
};

const goProductList = () => {
  // Navegar a la lista de productos
	router.push({ name: 'tienda' });
};

/*onMounted(() => {
    // Aquí colocas la parte del montaje de tu componente
    stripe.value = Stripe('pk_test_51P5vMbRx81LoxLbfWrPxTVgFYMSC5OpElcSdB8yQotj2kkr4xYf2gghVqLejnjPvZgrhV319bQNV5cEJ2PLepUE200cogMxVs5');
    const elements = stripe.value.elements();
    card.value = elements.create('card');
    card.value.mount('#card-element');
});*/
</script>

<style scoped>
/* Primera parte */
body{
  background: linear-gradient(to bottom, #000000, #424242);
  color: #ffffff;
}
.context{
  background: url(../assets/IMG/fondooo.png);
}
.card-title{
  color: white;
  font-family:Bonechiller Free;
  text-align: center;
  
}
.card-text{
  color: rgb(0, 0, 0);
  text-align: center;
}

.foto{
    max-width:180px;
    max-height:180px;
}

.imgProduct{
  max-width:150px;
  max-height:150px;
}

.card{
  align-items: center;
}
.pack{
  text-align: center;
}
.popular{
  text-align: center;
}
.productos{
  text-align: center;
}
</style>
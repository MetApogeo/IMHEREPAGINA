<template>
	<body>
		<div class="container" >
			<div v-if="listaCarrito.length > 0">
				<br><br><br><br><br>
				<h1>Checkout</h1>
				<div class="row py-5 bg-white" style="margin-top: 50px; color:black; ">
					<div  v-for="producto in listaCarrito" :key="producto.id" class="col-xs-12" >
						<div class="row">
							<div class="col-md-3">
							<img class="card-img-top" :src="'http://127.0.0.1:8000/api/producto/foto/'+producto.imagen"  alt="Card image cap" style="width: 60%; ">
							</div>
							<div class="col-md-4">{{ producto.nombre }}<br>{{ producto.descripcion }}</div>
							<div class="col-md-3"><p>${{ producto.precio }}</p></div>
							<div class="col-md-2"><button @click="eliminarCarrito(producto.id)">Eliminar</button></div>
						</div>
					</div>
				</div>
				<p>Total: ${{ totalCarrito }}</p>
				<form @submit.prevent="processPayment">
					<div class="input-field">
						<label for="name">Nombre en la tarjeta</label>
						<input type="text" id="name" v-model="cardName" required>
					</div>
					<div class="input-field">
						<label for="card-number">Número de tarjeta</label>
						<div id="card-number" class="input-element"></div>
					</div>
					<div class="input-field">
						<label for="expiry">Fecha de expiración</label>
						<div id="expiry" class="input-element"></div>
					</div>
					<div class="input-field">
						<label for="cvc">CVC</label>
						<div id="cvc" class="input-element"></div>
					</div>
					<div class="input-field">
						<label for="email">Correo electrónico</label>
						<input type="email" id="email" v-model="email" required>
					</div>
					<div class="input-field">
						<label for="postal-code">Código Postal</label>
						<input type="text" id="postal-code" v-model="postalCode" required>
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
import { loadStripe } from '@stripe/stripe-js';

import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const listaCarrito = ref([]);
const totalCarrito = ref(0);

const router = useRouter();

// Variable reactiva para almacenar la lista de productos y el carrito
const listaProductos = ref([]);
const loading = ref(false);
let stripe = null;
const card = ref(null);
const cardName = ref('');
const email = ref('');
const postalCode = ref('');
let elements = null; 
const total = ref(0);
const stripePromess = loadStripe('pk_test_51P5vMbRx81LoxLbfWrPxTVgFYMSC5OpElcSdB8yQotj2kkr4xYf2gghVqLejnjPvZgrhV319bQNV5cEJ2PLepUE200cogMxVs5')


const cargarCarrito = async () => {
	try {
		await store.dispatch('cargarCarrito');
		listaCarrito.value = store.state.carrito;
		calcularPrecioTotal();
	} catch (error) {
		console.error('Error al cargar el carrito:', error);
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


const calcularPrecioTotal = () => {
	totalCarrito.value = listaCarrito.value.reduce((total, producto) => total + producto.precio, 0).toFixed(2);
}

// Llama a la función consultarProductos cuando el componente se monta
onMounted(() => {
	cargarCarrito();
});

watch(() => store.state.carrito, () => {
	listaCarrito.value = store.state.carrito;
	calcularPrecioTotal();
});

const processPayment = async () => {
	loading = true;
			const accessToken = localStorage.getItem('miAppToken');

			if (!elements || !stripe) {
				errorMessage = 'Error al cargar el formulario de pago';
				loading = false;
				return;
			}

		try {
				const cardElement = elements.getElement('cardNumber');
				const { token, error } = await stripe.createToken(cardElement, {
					name: cardName,
					email: email,
					address_zip: postalCode
				});

				if (error) {
					console.error('Error al crear el token de la tarjeta:', error);
					errorMessage = error.message;
					loading = false;
					return;
				}

				const response = await axios.post('http://localhost:8000/api/carritocompras', {
					token: token.id,
					total: total,
					carrito: listaCarrito},{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${accessToken}`
					}
				});

				if (response.ok) {
					console.log('Pago exitoso');
				} else {
					console.error('Error al procesar el pago:', response.statusText);
					errorMessage = 'Error al procesar el pago';
				}
				loading = false;
			} catch (error) {
				console.error('Error al procesar la solicitud:', error);
				errorMessage = 'Error al procesar la solicitud';
				loading = false;
			}
};

const goProductList = () => {
  // Navegar a la lista de productos
	router.push({ name: 'tienda' });
};

onMounted(() => {
    stripePromess.then(stripeInstance => {
		stripe = stripeInstance;
		elements = stripe.elements();

		// Estilo del elemento de tarjeta
		const style = {
			base: {
			fontSize: '16px',
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			'::placeholder': {
				color: '#aab7c4'
			}
			},
			invalid: {
			color: '#fa755a'
			}
		};

		// Crear los elementos de tarjeta de crédito y montarlos
		const cardNumber = elements.create('cardNumber', { style });
		cardNumber.mount('#card-number');
		const expiry = elements.create('cardExpiry', { style });
		expiry.mount('#expiry');
		const cvc = elements.create('cardCvc', { style });
		cvc.mount('#cvc');
	});
});

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
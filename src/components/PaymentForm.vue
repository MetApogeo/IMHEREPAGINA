<template>
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

        <div v-if="loading" class="loading-overlay">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Cargando...</span>
        </div>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { cargarCarrito, calcularTotalCarrito } from '../api/api';

const listaCarrito = ref([]);
const totalCarrito = ref(0);

let stripe = null;
let elements = null;
const cardName = ref('');
const email = ref('');
const postalCode = ref('');
let loading = false;

const stripePromess = loadStripe('pk_test_51P5vMbRx81LoxLbfWrPxTVgFYMSC5OpElcSdB8yQotj2kkr4xYf2gghVqLejnjPvZgrhV319bQNV5cEJ2PLepUE200cogMxVs5');


onMounted(async () => {
    try {
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
    } catch (error) {
        console.error('Error:', error);
    }

});

const processPayment = async () => {
    loading = true;
			const accessToken = localStorage.getItem('miAppToken');

			if (!elements || !stripe) {
				errorMessage = 'Error al cargar el formulario de pago';
				loading.value = false;
				return;
			}

		try {
				const cardElement = elements.getElement('cardNumber');
				const { token, error } = await stripe.createToken(cardElement, {
					name: cardName.value,
				});

				if (error) {
					console.error('Error al crear el token de la tarjeta:', error);
					errorMessage = error.message;
					loading = false;
					return;
				}

                // Cargar el carrito desde el API
                listaCarrito.value = await cargarCarrito();

                // Calcular el total del carrito
                totalCarrito.value = calcularTotalCarrito(listaCarrito.value);
                const emailValue = email.value.toString();
                const postalCodeValue = postalCode.value.toString();
                console.log(listaCarrito.value);

				const response = await axios.post('http://localhost:8000/api/carritocompras', {
					datosTarjeta: token.id,
					total: totalCarrito.value,
                    email: emailValue,
                    postalCode: postalCodeValue,
					productos: listaCarrito.value},
                    {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${accessToken}`
					}
				});

				if (response.status === 200) {
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
</script>

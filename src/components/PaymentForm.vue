<template>
    <form @submit.prevent="processPayment" class="payment-form">
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
        <button :disabled="loading" class="payment-button">
        {{ loading ? 'Procesando...' : 'Pagar' }}
        </button>

        <div v-if="loading" class="loading-overlay">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Cargando...</span>
        </div>
        </div>
        <!-- Modal de pago exitoso -->
        <div class="modal" :class="{ 'is-active': paymentSuccess }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <p class="has-text-centered">¡El pago ha concluido de forma exitosa!</p>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="paymentSuccess = false"></button>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { cargarCarrito, calcularTotalCarrito } from '../api/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const listaCarrito = ref([]);
const totalCarrito = ref(0);

let stripe = null;
let elements = null;
const cardName = ref('');
const email = ref('');
const postalCode = ref('');
let loading = false;
let paymentSuccess = false;

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
                // Si el pago es exitoso, cambiar el valor de la variable paymentSuccess a true
                paymentSuccess = true;

                // Después de un tiempo (por ejemplo, 3 segundos), resetear paymentSuccess a false para ocultar la alerta
                setTimeout(() => {
                    paymentSuccess = false;
                }, 3000);
				if (response.status === 200) {
                    
                    console.log('Pago exitoso');
                    router.push({ name: 'tienda' });
                    eliminarTodo();
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

<style scoped>

/* Estilos del modal */
.modal {
  transition: opacity 0.3s ease;
}

.modal-background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 1000;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
/* Payment Form Styles */
.payment-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #5f5f5f;
  border-radius: 8px;
  color: white;
}

.input-field {
  margin-bottom: 20px;
}

.input-field label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #ffffff;
}

.input-field input,
.input-element {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #eeeeee;
}

.input-element {
  height: 40px; /* Adjust height for card elements */
}

.payment-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.payment-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(146, 146, 146, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner-border {
  width: 2rem;
  height: 2rem;
}
</style>
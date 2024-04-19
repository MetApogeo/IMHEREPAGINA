<template>
	<body>
		<div class="container" >
			<div v-if="listaCarrito.length > 0">
				<br><br><br><br><br>
				<h1>Checkout</h1>
				<div class="row py-5 bg-white" style="margin-top: 50px; color:black; ">
					<div  v-for="producto in listaCarrito" :key="producto.id" class="col-xs-12" >
						<div class="row">
							<div class="col-md-4">
							<img class="card-img-top" :src="'http://127.0.0.1:8000/api/producto/foto/'+producto.imagen"  alt="Card image cap" style="width: 60%; ">
							</div>
							<div class="col-md-4">{{ producto.nombre }}<br><br>{{ producto.descripcion }}</div>
							<div class="col-md-4"><p>${{ producto.precio }}</p></div>
						</div>
					</div>
				</div>
				<p>Total: ${{ totalCarrito }}</p>
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
.input-element {
  margin-bottom: 1rem; /* Agregar un margen inferior para separar los elementos */
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
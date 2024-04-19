<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { watch } from 'vue';

import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { cargarCarrito, calcularTotalCarrito } from '../api/api';

const router = useRouter();

const store = useStore();


const listaCarrito = ref([]);
const totalCarrito = ref(0);

// Variable reactiva para almacenar la lista de productos y el carrito
const listaProductos = ref([]);




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

const comprar = () => {
  const checkoutItems = listaCarrito.value.map(producto => ({ 
    id: producto.id,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    imagen: producto.imagen
  }));
  localStorage.setItem('checkout', JSON.stringify(checkoutItems));
  router.push({ name: 'checkout' });
};

const irTienda = () => {
  router.push({ name: 'tienda'});
}


// Llama a la función consultarProductos cuando el componente se monta
onMounted(async () => {
  try {
    // Cargar el carrito desde el API
    listaCarrito.value = await cargarCarrito();

    // Calcular el total del carrito
    totalCarrito.value = calcularTotalCarrito(listaCarrito.value);
  } catch (error) {
    console.error('Error al cargar el carrito:', error);
    // Manejar el error según sea necesario
  }
});






</script>




<template >
  <!-- primera parte -->
<body>
  <div class="container">
    <div v-if="listaCarrito.length > 0">
      <br><br><br><br><br>
      <h1>Resumen de la compra</h1>
      <div class="row py-5 checkout-container">
        <div v-for="producto in listaCarrito" :key="producto.id" class="col-md-6 col-lg-4 col-xl-3">
          <div class="producto-card">
            <img class="card-img-top producto-img" :src="'http://127.0.0.1:8000/api/producto/foto/'+producto.imagen"  alt="Card image cap">
            <div class="producto-info">
              <div class="producto-nombre">{{ producto.nombre }}</div>
              <div class="producto-descripcion">{{ producto.descripcion }}</div>
              <div class="producto-precio">${{ producto.precio }}</div>
              <div class="eliminar-btn-container"><button @click="eliminarCarrito(producto.id)" class="eliminar-btn btn">Eliminar</button></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row py-3">
        <div class="col-md-6">
          <button @click="eliminarTodo" class="btn btn-danger">Eliminar todo</button>
        </div>
        <div class="col-md-6 text-end">
          <!-- Mostrar el precio total -->
          <p class="fs-4">Precio total: ${{ totalCarrito }}</p>
          <button @click="comprar" class="btn btn-primary">Comprar</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>El carrito está vacío.</p>
      <br>
      <button @click="irTienda" class="btn btn-primary">Ir a lista de Productos</button>
    </div>
  </div>

</body>
  
</template>

<style scoped>
/* Primera parte */
body{
  background: linear-gradient(to bottom, #000000, #424242);
  color: #ffffff;
  
}


container {
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
  background-color: #ff4d4d;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.eliminar-btn:hover {
  background-color: #cc0000;
}

.eliminar-btn-container {
  margin-top: 10px;
}

.btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #4d79ff;
  border: none;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0052cc;
}

.btn-danger {
  background-color: #ff4d4d;
  border: none;
  color: #ffffff;
}

.btn-danger:hover {
  background-color: #cc0000;
}
</style>

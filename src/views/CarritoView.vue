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
  <div class="container" style="">
      <div class="img-tienda row justify-content-center">
        <div class="col-md-6 offset-md-3 ">
          <img src="../assets/img/tienda.png" alt="Foto tienda" style="width: 13rem;">
        </div>
      </div>
      <div class="row py-5" style="margin-top: 100px; color:black; background-color: #424242; border-radius: 20px; color:white">
        <div  v-for="producto in listaCarrito" :key="producto.id" class="col-xs-12 producto-container" >
          <div class="row">
            <div class="col-md-3">
              <img class="card-img-top producto-img" :src="'http://127.0.0.1:8000/api/producto/foto/'+producto.imagen"  alt="Card image cap" style="width: 60%; ">
            </div>
            <div class="col-md-4">
              <div class="row producto-nombre">
                {{ producto.nombre }}
              </div>
              <div class="row producto-descripcion">
                {{ producto.descripcion }}
              </div>
            </div>
            <div class="col-md-3 producto-precio">${{ producto.precio }}</div>
            <div class="col-md-2"><button @click="eliminarCarrito(producto.id)" class="eliminar-btn btn">Eliminar</button></div>
          </div>
        </div>
      </div>

      <!-- Botón para eliminar todo el carrito -->
      <div class="row py-3">
        <div class="col-md-6">
          <button @click="eliminarTodo" class="btn btn-danger">Eliminar todo</button>
        </div>
        <div class="col-md-6 text-end">
          <!-- Mostrar el precio total -->
          <p class="fs-4">Precio total: ${{ totalCarrito }}</p>
        </div>
      </div>

      <!-- Botón para comprar -->
      <div class="row py-3">
        <div class="col-md-12 text-center">
          <button @click="comprar" class="btn btn-primary">Comprar</button>
        </div>
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
</style>

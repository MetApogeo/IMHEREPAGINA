<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { watch } from 'vue';

// Variable reactiva para almacenar la lista de productos y el carrito
const listaProductos = ref([]);
const listaCarrito = ref([]);
const precioTotal = ref(0);

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

const comprar = () => {
  console.log('Datos del carrito: ',listaCarrito.value);
};

const calcularPrecioTotal = () => {
  precioTotal.value = listaCarrito.value.reduce((total, producto) => total + producto.precio, 0).toFixed(2);
}


// Llama a la función consultarProductos cuando el componente se monta
onMounted(() => {
  consultarProductos();
});

watch(listaCarrito, () => {
  calcularPrecioTotal();
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
      <div class="row py-5 bg-white" style="margin-top: 100px; color:black; ">
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

      <!-- Botón para eliminar todo el carrito -->
      <div class="row py-3">
        <div class="col-md-6">
          <button @click="eliminarTodo" class="btn btn-danger">Eliminar todo</button>
        </div>
        <div class="col-md-6 text-end">
          <!-- Mostrar el precio total -->
          <p class="fs-4">Precio total: ${{ precioTotal }}</p>
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
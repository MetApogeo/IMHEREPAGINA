<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { watch } from 'vue';

// Variable reactiva para almacenar la lista de productos

const listaProductos = ref([]);
const productoSeleccionado = ref([]);
const productoAgregado = ref(false);
const listaCarrito = ref([]);


// Función asincrónica para obtener la lista de productos desde la API
const obtenerProductos = async () => {
  try {
    // Realiza la solicitud GET a la API para obtener la lista de productos
    const response = await axios.get('http://127.0.0.1:8000/api/producto');

    // Almacena los datos de la respuesta (lista de productos) en la variable listaProductos
    listaProductos.value = response.data;
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener la lista de productos:', error);
    throw error; // Puedes relanzar el error para manejarlo en otro lugar si es necesario
  }
}; 



const agregarCarrito = (producto) => {
  try {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Obtiene el carrito o inicializa como un array vacío
    const id = producto.id;

    if (!carrito.includes(id)) {
      carrito.push(id); // Agrega el ID del producto al carrito
      localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito actualizado en el almacenamiento local
      console.log('Producto agregado al carrito:', producto.nombre); 

      // Establecer la variable productoAgregado en true y luego volver a false después de 3 segundos
      productoAgregado.value = true;
      setTimeout(() => {
        productoAgregado.value = false;
      }, 3000);
    } else {
      console.log('El producto ya está en el carrito:', producto.nombre);
      // Aquí podrías mostrar un mensaje al usuario indicando que el producto ya está en el carrito
    }
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    // Aquí podrías manejar el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario
  }
};


const mostrarDetalles = (producto => {
  productoSeleccionado.value = producto;
  console.log('Mostrando detalles del producto:', productoSeleccionado.value.nombre);
});



// Llama a la función obtenerProductos cuando el componente se monta
onMounted(() => {
  obtenerProductos();
});



</script>

<template >
  <!-- primera parte -->
<body>
    <div class="container text-white " style="padding-top: 100px;">
    <div class="card context">
    <div class="card-body cardd" >
      <h1 class="card-title">I'M HERE</h1>
      <p class="card-text" style="color: white;">Hasta 15% de descuento en la primera compra</p>
    </div>
  </div>
  </div>
<!-- segunda parte -->
<br>
<br>
<div class="container text-center">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="(producto, index) in listaProductos" :key="index" class="col">
        <div class="card h-100 hover-effect producto" style="position: relative;" @click="mostrarDetalles(producto)" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <!-- Utiliza la imagen del producto si está disponible, de lo contrario, muestra una imagen predeterminada -->
          <img v-if="producto.imagen" :src="producto.imagen" class="card-img-top imgProduct" :alt="producto.nombre">
          <img v-else src="../assets/IMG/oso.png" class="card-img-top imgProduct" :alt="producto.nombre">
          <div class="card-body">
            <!-- Botones para agregar al carrito y ver detalles -->
            
            <!-- Muestra el precio del producto en la esquina inferior derecha -->
            <p class="precio">$ {{ producto.precio }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-custom">
    <div class="modal-content bg-dark text-white">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ productoSeleccionado.nombre }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="background-color: #6c757d; border-color: #6c757d;"></button>
      </div>
      <div class="modal-body">
        <div class="row" :class="{ 'producto-agregado' : productoAgregado}">
          <div class="col-md-6">
            <img v-if="productoSeleccionado.imagen" :src="productoSeleccionado.imagen" class="img-fluid" :alt="productoSeleccionado.nombre">
            <img v-else src="../assets/IMG/oso.png" class="img-fluid" :alt="productoSeleccionado.nombre">
          </div>
          <div class="col-md-6">
            <p>{{ productoSeleccionado.descripcion }}</p>
            <p>Precio: $ {{ productoSeleccionado.precio }}</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" @click="agregarCarrito(productoSeleccionado)" :disabled="productoAgregado">
          {{ productoAgregado ? 'Producto Agregado' : 'Agregar al carrito' }}
        </button>
        <div v-if="productoAgregado" class="alert alert-success" role="alert">
          El producto ha sido agregado al carrito.
        </div>
      </div>
    </div>
  </div>
</div>




<br>
<br>

<h2 class="pack">Pack de objetos.</h2>

                <div class="row productos">
    
                  <div class="col-md-3 col-xs-12">
                    <div class="col-xs-3 col-md-12">
                      <img src="../assets/IMG/oso.png" alt="Item1" class="imgProduct">
                    </div>
                    <div class="col-md-12 textos col-xs-3">Sudadera Azul Marino Scarlet</div>
                    <div class="row">
                      <div class="col-md-6"><button type="button" class="btn btn-success rounded-pill">Comprar</button></div>
                      <div class="col-md-6"><button type="button" class="btn btn-outline-info rounded-pill">Detalles</button></div>
                    </div> 
                  </div>

                  <div class="col-md-3 col-xs-12">
                    <div class="col-md-12 col-xs-3">
                      <img src="../assets/IMG/oso.png" alt="Item2" class="imgProduct">
                    </div>
                    <div class="col-md-12 textos col-xs-3">Playera Negra Verbrantt</div>
                    <div class="row">
                      <div class="col-md-6"><button type="button" class="btn btn-success rounded-pill">Comprar</button></div>
                      <div class="col-md-6"><button type="button" class="btn btn-outline-info rounded-pill">Detalles</button></div>
                    </div> 
                  </div>

                  <div class="col-md-3 col-xs-12">
                    <div class="col-md-12 col-xs-3">
                      <img src="../assets/IMG/oso.png" alt="Item3" class="imgProduct">
                    </div>
                    <div class="col-md-12 textos col-xs-3">Playera Kaki Verbrantt</div>
                    <div class="row">
                      <div class="col-md-6"><button type="button" class="btn btn-success rounded-pill">Comprar</button></div>
                      <div class="col-md-6"><button type="button" class="btn btn-outline-info rounded-pill">Detalles</button></div>
                    </div> 
                  </div>

                  <div class="col-md-3 col-xs-12">
                    <div class="col-md-12 col-xs-3">
                      <img src="../assets/IMG/oso.png" alt="Item4" class="imgProduct">
                    </div>
                    <div class="col-md-12 textos col-xs-3">Blusa Vestido Aerodinamico Negro Scarlet</div>
                    <div class="row">
                      <div class="col-md-6"><button type="button" class="btn btn-success rounded-pill">Comprar</button></div>
                      <div class="col-md-6"><button type="button" class="btn btn-outline-info rounded-pill">Detalles</button></div>
                    </div> 
                  </div>
                </div>
    
    
             
              <!--Columna de Productos-->
              <br>
              <div class="container">
                <div class="card text-white" style="background-color: black;">
                <div class="row">
                    <!-- Columna para la imagen -->
                    <div class="col-md-6">
                        <img src="../assets/IMG/LOGOOOOOOOO.png" class="foto" alt="Logo">
                    </div>

                    <!-- Columna para el texto -->
                    <div class="col-md-6">
                        <div class="card-body">
                            <h3 class="card-title">Sé parte de esta <br> espantosa travesía. <br> ¡Descargalo Ya!</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
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

.imgProduct {
  width: 100%; /* Ajusta el ancho de la imagen al tamaño de la tarjeta */
  height: auto; /* Establece la altura automática para mantener la proporción de la imagen */
  object-fit: cover; /* Ajusta la imagen para que cubra toda la tarjeta */
}

/* Estilos para el precio */
.precio {
  position: absolute; /* Establece la posición absoluta para el precio */
  bottom: 0; /* Lo coloca en la parte inferior */
  right: 0; /* Lo coloca en la esquina derecha */
  background-color: rgba(0, 0, 0, 0.5); /* Agrega un fondo semitransparente al precio */
  color: white; /* Establece el color del texto del precio */
  padding: 0.5rem; /* Añade espacio alrededor del precio */
  border-top-left-radius: 0.25rem; /* Agrega bordes redondeados a la esquina superior izquierda del precio */
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
.card {
  border: none;
}



.badge {
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.btn {
  margin-top: 0.5rem;
}

@media (min-width: 768px) {
  .card {
    height: 100%;
  }
}

/* Estilos para la tarjeta */
.hover-effect {
  transition: transform 0.3s ease; /* Agrega una transición suave a la escala */
}

.hover-effect:hover {
  transform: scale(1.05); /* Escala la tarjeta al 105% cuando se pasa el cursor sobre ella */
  cursor: pointer; /* Cambia el cursor al estilo de un botón */
}

.modal-custom {
  max-width: 80%; /* Cambia el valor según lo ancho que desees el modal */
}

.producto-agregado {
  animation: productoAgregadoAnimacion 1s ease;
}

@keyframes productoAgregadoAnimacion {
  0% {
    transform: translateY(-20px); /* Mueve el producto hacia arriba */
    opacity: 0; /* Hace que el producto sea transparente */
  }
  100% {
    transform: translateY(0); /* Restaura la posición original */
    opacity: 1; /* Restaura la opacidad original */
  }
}

</style>
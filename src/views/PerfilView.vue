<template>
  <body>
  <div class="row">
    
  <div class="col-md-12" style="margin-top: 6%;">
      <div id="Pagina"  style="position: relative;">
        <button class="btn btn-secondary position-absolute top-0 end-0 m-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
          </svg>
          Historial
        </button>
              <div class="row">
                
                  <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
                      <img class="foto" src="../assets/IMG/perfil.png" alt="">
                      <button class="btn btn-dark" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Icono</button>
                  </div>
                  <div class="col-md-6">
                      <h2 class="display-1" style="margin-top: 30px;">Usuario</h2>
                      <div v-if="user">
                          <p class="texto-grande" style="margin-top: -7px;"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                          </svg><strong> Nombre:</strong> {{ user.nombre }}</p>
                      
                          <p class="texto-grande" style="margin-top: -5px;"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                          </svg><strong> Correo:</strong> {{ user.correo }}</p>
                      
                          <p class="texto-grande" style="margin-top: -5px;"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                          </svg><strong> Fecha de Nacimiento:</strong> {{ user.fecha }}</p>
                      
                          <p class="texto-grande" style="margin-top: -5px;"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-gender-ambiguous" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"/>
                          </svg><strong> Sexo:</strong> {{ user.sexo }}</p>
                      </div>
                  <div v-else style="display: flex; align-items: center; justify-content: center; margin-top: 20%; margin-bottom: 20%; margin-right: 220px;">
                      <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                      </div>
                  </div>
              <div>
                  <p v-if="token"></p>
                  <button class="btn btn-danger position-absolute bottom-0 end-0 m-3" style="z-index: 100;" @click="eliminarToken">Cerrar Sesión</button>
              </div>
          </div>
              <div>
                  
              </div>
          </div>
      </div>
      </div>
    </div>
    <div class="offcanvas offcanvas-start" style="background-color:#1D1D1D; color: blanchedalmond;" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header">
      <h4 class="offcanvas-title" id="offcanvasScrollingLabel">Iconos</h4>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="row">
          <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <img class="cambio" src="../assets/IMG/perfil.png" alt="">
          </div>
          <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <img class="cambio" src="../assets/IMG/perfil.png" alt="">
          </div>
          <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <img class="cambio" src="../assets/IMG/perfil.png" alt="">
          </div>
      </div>
    </div>
    </div>

    <!--Historial-->

    <div class="offcanvas offcanvas-end" style="background-color:#1D1D1D; color: blanchedalmond;" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Historial de Compras</h5>
        <button type="button" class="btn-close text-reset btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <Historial :user="user"/>
      </div>
    </div>
  </body>
  
</template>
<script setup>
import { useStore } from 'vuex'
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import store from '../store/store.js';
import Historial from '../components/Historial.vue';

const router = useRouter()
const tokenKey = 'miAppToken';

// Configurar el token como una variable reactiva
const token = ref(localStorage.getItem(tokenKey));

const user =  ref(store.state.user);

const rutaImagen = ref('');




const eliminarToken = () => {
  localStorage.removeItem(tokenKey);
  store.commit('setToken', null); // Actualizar token en Vuex
  router.push({ name: 'login' })
}


onMounted(() => {
  
});


</script>

<style>
.post-form {
background-color: #fff;
padding: 15px;
border: 1px solid #ddd;
border-radius: 5px;
}

.posts {
margin-top: 20px;
}

/* Agrega estilos adicionales según sea necesario */
</style>

<style scoped>
body{
background-image: url(../assets/IMG/PFondo.jpeg);
color: black;
background-size: cover;

}
.display-1{
font-family: HelpMe;
}
.foto{
max-width:310px;
max-height:310px;
border-radius: 50%;
}

.cambio{
  max-width: 70px;
  max-height: 70px;
  border-radius: 50%;
}

#Pagina{
  background-image: url(../assets/IMG/fill.png);
  background-size:cover;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 7%;
  color: white;
  text-shadow: -1px -1px 1px black,  
               1px -1px 1px black,
               -1px 1px 1px black,
               1px 1px 1px black;
}

.texto-grande {
font-size: 20px;
align-items: center;
margin-top: 5%;
}

.foto + button {
  margin-top: 20px; /* Aumenta este valor para más espacio */
}
</style>
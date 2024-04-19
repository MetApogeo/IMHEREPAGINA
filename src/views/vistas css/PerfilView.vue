<template>
    <body>
        <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <div class="row">
      <div v-if="user">
        <div class="col-md-8">
          <img class="foto" :src="'http://127.0.0.1:8000/api/usuario/foto/'+user.imagen" alt="">
        </div>
      </div>
        
    <div class="col-6 col-md-4" style="margin-top: 6%;">
            <h2 class="display-1">Usuario</h2>
            <div v-if="user">
                
                <input type="file" @change="handleFileUpload">
                <p class="texto-grande"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg><strong> Nombre:</strong> {{ user.nombre }}</p>

                <p class="texto-grande"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg><strong> Correo:</strong> {{ user.correo }}</p>

                <p class="texto-grande"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                </svg><strong> Fecha de Nacimiento:</strong> {{ user.fecha }}</p>

                <p class="texto-grande"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-gender-ambiguous" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"/>
                </svg><strong> Sexo:</strong> {{ user.sexo }}</p>
            </div>
            <div v-else style="display: flex; align-items: center; justify-content: center; margin-top: 25vh; margin-right: 180px;">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div>
                <p v-if="token"></p>
                <button style="position: absolute; bottom: 100px; right: 100px;" class="btn btn-outline-danger" @click="eliminarToken">Eliminar Token</button>
            </div>
            
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

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('imagen', file);

    axios.post('http://127.0.0.1:8000/api/upload-imagen', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token.value}`
        }
    })
    .then(response => {
        // Actualizar la ruta de la imagen en el usuario en Vuex
        user.value.imagen = response.data.url;

        // Enviar la ruta de la imagen al servidor para actualizar el usuario
        axios.put(`http://127.0.0.1:8000/api/usuario/${user.value.id}`, { imagen: response.data.url }, {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            // Manejar la respuesta si es necesario
            console.log('Usuario actualizado con la nueva imagen');

            // Actualizar el estado del usuario en Vuex con la nueva información
            store.commit('setUser', { ...user.value, imagen: response.data.url });
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
        });
    })
    .catch(error => {
        console.error('Error al subir la imagen:', error);
    });
};


const eliminarToken = () => {
    localStorage.removeItem(tokenKey);
    store.commit('setToken', null); // Actualizar token en Vuex
    router.push({ name: 'login' })
}


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
background: linear-gradient(to bottom, #000000, #424242);
color: #ffffff;
  
}
.display-1{
  font-family: HelpMe;
}
.foto{
  max-width:720px;
  max-height:720px ;
}

.texto-grande {
font-size: 20px;
align-items: center;
margin-top: 5%;
}
</style>
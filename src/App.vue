<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navbaner from './components/navbaner.vue';
import footersito from './components/Footersito.vue'
import DatePicker from 'vue3-datepicker';
import { ref, onMounted } from 'vue';
import { watch } from 'vue';
import store from './store/store';
import axios from 'axios';
import { useRouter } from 'vue-router'

const tokenKey = 'miAppToken';
const token = ref(localStorage.getItem(tokenKey));
const navbarVisible = ref(token.value !== null);
const user = ref(null);
const router = useRouter()

watch(() => store.state.carrito.listaCarrito, () => {
  // Manejar cambios en el carrito
});

onMounted(() => {
  store.dispatch('cargarCarrito');
});

// Observar cambios en el token y actualizar la visibilidad del navbar
watch(() => store.state.token, (newToken) => {
  if (newToken) {
    localStorage.setItem(tokenKey, newToken);
    token.value = newToken;
    navbarVisible.value = true;
  } else {
    localStorage.removeItem(tokenKey);
    token.value = null;
    navbarVisible.value = false;
  }
});

const obtenerDatosUsuario = async (newToken) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user', {
      headers: {
        Authorization: 'Bearer ' + newToken
      }
    });
    // Almacenar los datos del usuario en el store Vuex
    store.commit('setUser', response.data);
    console.log('Datos del usuario:', store.state.user);
    user.value=store.state.user;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
  }
};

watch(() => router.currentRoute.value, (to, from) => {
  // Verificar si hay un nuevo token en la URL o si hay un cambio en la ruta
  const newToken = to.query.token || store.state.token;
  // Llamar a la función obtenerDatosUsuario con el nuevo token
  obtenerDatosUsuario(newToken);
}, { immediate: true }); 


onMounted(() => {
  
  if (token.value == null){
    router.push({ name: 'login' })
  }
});

obtenerDatosUsuario(token.value);
</script>




<template>
  
  <navbaner v-show="navbarVisible" :user="user"/>
  <RouterView/>
  <footersito />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

body{
  min-height: 700px;
}

</style>

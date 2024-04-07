<template>
    <body class="bg-black bg-gradient">
        <head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        </head>
        <div class="login-container">
            <div class="overlay">
                <div class="d-flex justify-content-center align-items-center">
            <div class="bg-body-tertiary p-5 rounded-4 bg-opacity-25" style="width: 25rem; margin-top: 6rem; height: 550px">
            <div>
            
                <div class="text-center fs-2 text-white" style="margin-bottom: 2rem;">Iniciar Sesion</div>
            </div>
            <form @submit.prevent="iniciarSesion">
                    <div class="card-body">
                      <div class="input-group mb-3">
                        <span class="input-group-text"><i class="bi bi-person-vcard-fill"></i></span>
                        <div class="form-floating">
                          <input v-model="correo" type="text" class="form-control" id="floatingInputGroup1" placeholder="Correo">
                          <label for="floatingInputGroup1">Correo</label>
                        </div>
                      </div>

                      <div class="input-group mb-3">
                        <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
                        <div class="form-floating">
                          <input v-model="contraseña" type="password" class="form-control" id="floatingInputGroup2" placeholder="Contraseña">
                          <label for="floatingInputGroup2">Contraseña</label>
                        </div>
                      </div>

                      <div class="row pt-1" style="margin-top: 2rem;">
                        <div class="col-md-4">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label text-white" for="flexCheckDefault">Recordarme</label>
                          </div>
                        </div>
                        <div class="col-md-8">
                          <a href="#" class="text-decoration-none text-white fw-semibold " style="font-size: 0.7rem; padding-left: 1.9rem;">¿Olvidaste tu contraseña?</a>
                        </div>
                      </div>
                      
                      <div class="d-grid gap-2" style="padding-top: 1rem; margin-bottom: 2rem;">
                        <button type="submit" class="btn btn-danger text-white">Login</button>
                      </div>
                    </div>
                  </form>
                  <div class="row">
                    <div class="col-md-3">
                    </div>
                    <div class="col-md-9">
                      <router-link to="/registro">
                        <span style="font-size: 1rem; padding-left: 1.9rem;" class="text-decoration-none text-white fw-semibold ">
                          Crear Cuenta
                        </span>
                      </router-link>
                    </div>
                  </div>
                    
            </div>
            </div>

            </div>
        


            </div>


    </body>

    

</template>

<style scoped>
  .login-container{
    min-height: 600px;
  }

</style>

<!--<script>
import axios from 'axios';
import { ref } from 'vue';
export default {
  props: {
    token: String,
  },
  setup() {
    const token = ref(null)

    const iniciarSesion = async () => {
      try {
        // Realizar la solicitud POST para iniciar sesión
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          correo: this.correo,
          contraseña: this.contraseña
        });

        // Asignar el token de respuesta a la referencia reactiva
        token.value = response.data.token

        // Verificar si se asignó correctamente
        console.log(token.value)
      } catch (error) {
        // Manejar errores
        console.error('Error al iniciar sesión:', error)
      }
    }

    return { token, iniciarSesion }
  },
  data() {
    return {
      correo: '',
      contraseña: ''
    };
  },
  methods: {
    /*async iniciarSesion() {
      try {
        // Realizar la solicitud POST a la API de Laravel para iniciar sesión
        

        // Manejar la respuesta de la API
        //console.log(response.data);

        this.token.value = response.data;

        console.log(this.token.value);

        // Redirigir al usuario a la página deseada después del inicio de sesión
        this.$router.push({ name: 'home' }); // Ajusta 'nombre_de_la_ruta' según sea necesario

      } catch (error) {
        // Manejar errores
        console.error('Error al iniciar sesión:', error);
      }
    }*/
  }
};
</script>-->

<script setup>
  import { useStore } from 'vuex'
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'

  const store = useStore()
  const correo = ref('')
  const contraseña = ref('')

  const router = useRouter()

  const iniciarSesion = async () => {
    try {
      // Realizar la solicitud POST para iniciar sesión
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        correo: correo.value,
        contraseña: contraseña.value
      });

      // Establecer el token en el store Vuex
      store.commit('setToken', response.data.token)

      // Verificar si el token se ha establecido correctamente en el store Vuex
      console.log('Token en el store Vuex:', store.state.token);
      // Redirigir al usuario a la página deseada después del inicio de sesión
      router.push({ name: 'home' })

      

    } catch (error) {
      // Manejar errores
      console.error('Error al iniciar sesión:', error)
    }
  }
</script>

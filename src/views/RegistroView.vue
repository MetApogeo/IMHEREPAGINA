<template>
    <body class="bg-black bg-gradient">
        <head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        </head>
        <div class="register-container">
            <div class="overlay1">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="bg-body-tertiary p-5 rounded-4 bg-opacity-25" style="width: 25rem; margin-top: 7em; margin-bottom: 7rem;">
                        <div>
                            <div class="text-center fs-2 text-white" style="margin-bottom: 2rem;">Registrarse</div>
                        </div>
                        <div class="card-body">
                            <div class="form-floating mb-3">
                                <input v-model="nombre" type="text" class="form-control" id="floatingName" placeholder="Name">
                                <label for="floatingPassword">Name</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input v-model="correo" type="email" class="form-control" id="floatingEmail" placeholder="name@example.com">
                                <label for="floatingInput">Email</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input v-model="contraseña" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                                <label for="floatingPassword">Password</label>
                            </div>
                            <div class="form-floating mb-3">
                                <DatePicker v-model="fechaPorDefecto" placeholder="Fecha de Nacimiento" class="form-control"></DatePicker>
                            </div>
                            <select v-model="sexo" class="form-select mb-3">
                                <option disabled value="">Selecciona tu género</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                            <!-- Utilizamos vue3-datepicker para el campo de fecha de nacimiento -->
                            
                            <div class="d-grid gap-2" style="padding-top: 1rem;">
                                <button @click="registrarUsuario" class="btn btn-danger text-white" type="button">Registrarse</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </body>
</template>


<style scoped>

</style>

<script>
import axios from 'axios';
import DatePicker from 'vue3-datepicker'; // Importamos el componente DatePicker

export default {
    components: {
        DatePicker, // Registramos el componente DatePicker
    },
    data() {
        return {
            nombre: '',
            correo: '',
            contraseña: '',
            fechaPorDefecto: new Date(),
            sexo: '',
        };
    },
    methods: {
        async registrarUsuario() {
            try {
                const userData = {
                    nombre: this.nombre,
                    correo: this.correo,
                    contraseña: this.contraseña,
                    fecha: this.fechaPorDefecto, // Ajusta esto según el formato que espera tu backend
                    sexo: this.sexo,
                    id_perfil: 2, // Ajusta esto según la lógica de tu aplicación
                };

                // Realizar la solicitud POST a la API de Laravel
                const response = await axios.post('http://127.0.0.1:8000/api/usuario', userData);

                // Manejar la respuesta de la API
                console.log(response.data);


                 // Redirigir al usuario a la página de inicio de sesión
                this.$router.push({ name: 'login' });

                
            } catch (error) {
                // Manejar errores
                console.error('Error al crear usuario:', error);
            }
        }
    },
};
</script>

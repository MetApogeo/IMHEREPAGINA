<template>
    <body>
        <div>a</div>
        <div class="espacio">
            <div class="container">
                <div class="col-md-12">
                <h2>Agregar Usuario</h2>
                    <form @submit.prevent="agregarUsuario">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" v-model="nombre" class="form-control" id="nombre" required>
                        </div>
                        <div class="form-group">
                            <label for="correo">Correo Electrónico</label>
                            <input type="email" v-model="correo" class="form-control" id="correo" required>
                        </div>
                        <div class="form-group">
                            <label for="contraseña">Contraseña</label>
                            <input type="password" v-model="contraseña" class="form-control" id="contraseña" required>
                        </div>
                        <div class="form-group">
                            <label for="id_perfil">ID de Perfil</label>
                            <input type="number" v-model="idPerfil" class="form-control" id="id_perfil" required>
                        </div>
                        <div class="form-group">
                            <label for="fecha">Fecha de Nacimiento</label>
                            <input type="date" v-model="fecha" class="form-control" id="fecha" required>
                        </div>
                        <div class="form-group">
                            <label for="sexo">Sexo</label>
                            <select v-model="sexo" class="form-control" id="sexo" required>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="coin">Coin</label>
                            <input type="number" v-model="coin" class="form-control" id="coin">
                        </div>
                        <div class="form-group">
                            <label for="imagen">Imagen</label>
                            <input type="text" v-model="imagen" class="form-control" id="imagen">
                        </div>
                        <button type="submit" class="btn btn-primary">Agregar Usuario</button>
                    </form>
                </div>
            </div>
        </div>
    </body>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const nombre = ref('');
const correo = ref('');
const contraseña = ref('');
const idPerfil = ref('');
const fecha = ref('');
const sexo = ref('');
const coin = ref(0);
const imagen = ref('');

const agregarUsuario = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/usuario', {
            nombre: nombre.value,
            correo: correo.value,
            contraseña: contraseña.value,
            id_perfil: idPerfil.value,
            fecha: fecha.value,
            sexo: sexo.value,
            coin: coin.value,
            imagen: imagen.value
        });
        console.log('Usuario agregado:', response.data);
        router.push({ name: 'listadousuarios' });
        // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
    }
};
</script>
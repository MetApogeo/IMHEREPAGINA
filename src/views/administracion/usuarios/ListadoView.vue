<template>
    <div>
        <body>
            <div>a</div>
            <div class="espacio">
                <div class="container">
                    <div class="col-md-12">
                        <form @submit.prevent="agregarUsuario">
                        <button type="submit" class="btn btn-success">Agregar</button>
                        </form>
                        <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <td>Acciones</td> <!-- Columna para acciones -->
                            <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="usuario in usuarios" :key="usuario.id">
                            <td>{{ usuario.id }}</td>
                            <td>{{ usuario.nombre }}</td>
                            <td>{{ usuario.correo }}</td>
                            <td>
                                <form @submit.prevent="eliminarUsuario(usuario.id)">
                                    <button @click="confirmarEliminar" class="btn btn-danger">Eliminar</button>
                                </form>
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="AbrirModal(usuario.id)">
                                Editar
                                </button>

                                <!-- Modal -->
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content bg-dark text-white">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="form-group">
                                                    <label for="nombre">ID</label>
                                                    <input type="hidden" v-model="id" class="form-control" id="id" required>
                                                </div>
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
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submmit" class="btn btn-primary" @click="Editar" data-bs-dismiss="modal">Guardar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </body>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const usuarios = ref([]);

const usuario = ref(null);

const nombre = ref('');
const correo = ref('');
const contraseña = ref('');
const idPerfil = ref('');
const fecha = ref('');
const sexo = ref('');
const coin = ref(0);
const imagen = ref('');

    const cargarUsuarios = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/usuario');
            usuarios.value = response.data;
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
    }
    };

    onMounted(cargarUsuarios);

    const confirmarEliminar = () => {
        return confirm("Realmente desea eliminar un usuario");
    };

    const eliminarUsuario = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/usuario/${id}`);
            // Actualizar la lista de usuarios después de eliminar
            cargarUsuarios();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };
    const AbrirModal = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}`);
            usuario.value = response.data;
            nombre.value = usuario.value.nombre;
            correo.value = usuario.value.correo;
            contraseña.value = usuario.value.contraseña;
            idPerfil.value = usuario.value.id_perfil;
            fecha.value = usuario.value.fecha;
            sexo.value = usuario.value.sexo;
            coin.value = usuario.value.coin;
            imagen.value = usuario.value.imagen;
        } catch (error) {
            console.error('Error al editar usuario:', error);
        }
    };

    const agregarUsuario = () => {
        router.push({ name: 'agregarusuario' }); // Cambia '/formulario-usuario' por la ruta correcta
    };

    const Editar = async () => {
        const UsuarioNuevo = {
            id: usuario.value.id,
            nombre: nombre.value,
            correo: correo.value,
            contraseña: contraseña.value,
            id_perfil: idPerfil.value,
            fecha: fecha.value,
            sexo: sexo.value,
            coin: coin.value,
            imagen: imagen.value 
        };

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/usuario/${usuario.value.id}`, UsuarioNuevo);
            console.log('Usuario actualizado:', response.data);
            cargarUsuarios();
        } catch (error) {
            console.error('Error al editar usuario:', error);
        }
    }
</script>


<style>
body{
  background: linear-gradient(to bottom, #000000, #424242);
  color: #ffffff;
}
</style>
<template>
    <div>
        <body>
            <div>a</div>
            <div class="espacio">
                <div class="container">
                    <div class="col-md-12">
                        <form @submit.prevent="agregarcarritocompras">
                        <button type="submit" class="btn btn-success">Agregar</button>
                        </form>
                        <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>id_usuario</th>
                            <th>estado</th>
                            <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="carritocompras in carritocomprass" :key="carritocompras.id">
                            <td>{{ carritocompras.id }}</td>
                            <td>{{ carritocompras.id_usuario }}</td>
                            <td>{{ carritocompras.estado }}</td>
                            <td>
                                <form @submit.prevent="eliminarcarritocompras(carritocompras.id)">
                                    <button @click="confirmarEliminar" class="btn btn-danger">Eliminar</button>
                                </form>
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="AbrirModal(carritocompras.id)">
                                Editar
                                </button>

                                <!-- Modal -->
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="form-group">
                                                    <label for="id_usuario">id_usuario</label>
                                                    <input type="text" v-model="id_usuario" class="form-control" id="id_usuario" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="estado">Estado</label>
                                                    <select v-model="estado" class="form-control" id="estado" required>
                                                        <option value="pendiente">Pendiente</option>
                                                        <option value="completado">Completado</option>
                                                        <option value="cancelado">Cancelado</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label for="total">Total</label>
                                                    <input type="number" v-model="total" class="form-control" id="total" required>
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

const carritocomprass = ref([]);

const carritocompras = ref(null);

const id_usuario = ref('');
const estado = ref('');
const total = ref('');

    const cargarcarritocomprass = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/carritocompras');
            carritocomprass.value = response.data;
        } catch (error) {
            console.error('Error al cargar carritocomprass:', error);
    }
    };

    onMounted(cargarcarritocomprass);

    const confirmarEliminar = () => {
        return confirm("Realmente desea eliminar un carritocompras");
    };

    const eliminarcarritocompras = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/carritocompras/${id}`);
            // Actualizar la lista de carritocomprass después de eliminar
            cargarcarritocomprass();
        } catch (error) {
            console.error('Error al eliminar carritocompras:', error);
        }
    };
    const AbrirModal = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/carritocompras/${id}`);
            carritocompras.value = response.data;
            id_usuario.value = carritocompras.value.id_usuario;
            estado.value = carritocompras.value.estado;
            total.value = carritocompras.value.total;
            
        } catch (error) {
            console.error('Error al editar carritocompras:', error);
        }
    };

    const agregarcarritocompras = () => {
        router.push({ name: 'agregarcarritocompras' }); // Cambia '/formulario-carritocompras' por la ruta correcta
    };

    const Editar = async () => {
        const carritocomprasNuevo = {
            id: carritocompras.value.id,
            id_usuario: id_usuario.value,
            estado: estado.value,
            total: total.value,
        };

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/carritocompras/${carritocompras.value.id}`, carritocomprasNuevo);
            console.log('carritocompras actualizado:', response.data);
            cargarcarritocomprass();
        } catch (error) {
            console.error('Error al editar carritocompras:', error);
        }
    }
</script>


<style>
    body{
        background: linear-gradient(to bottom, #000000, #424242);
        color: #ffffff;
    }
</style>
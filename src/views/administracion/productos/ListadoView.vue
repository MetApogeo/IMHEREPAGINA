<template>
    <div>
        <body>
            <div>a</div>
            <div class="espacio">
                <div class="container">
                    <div class="col-md-12">
                        <form @submit.prevent="agregarproducto">
                        <button type="submit" class="btn btn-success">Agregar</button>
                        </form>
                        <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <td>Inventario</td> <!-- Columna para acciones -->
                            <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="producto in productos" :key="producto.id">
                            <td>{{ producto.id }}</td>
                            <td>{{ producto.nombre }}</td>
                            <td>{{ producto.descripcion }}</td>
                            <td>
                                <form @submit.prevent="eliminarproducto(producto.id)">
                                    <button @click="confirmarEliminar" class="btn btn-danger">Eliminar</button>
                                </form>
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="AbrirModal(producto.id)">
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
                                                    <label for="nombre">Nombre</label>
                                                    <input type="text" v-model="nombre" class="form-control" id="nombre" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="descripcion">Descripcion</label>
                                                    <input type="text" v-model="descripcion" class="form-control" id="descripcion" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="precio">precio</label>
                                                    <input type="number" v-model="precio" class="form-control" id="precio" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="exclusivo">exclusivo</label>
                                                    <input type="number" v-model="exclusivo" class="form-control" id="id_perfil" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="inventario">inventario</label>
                                                    <input type="number" v-model="inventario" class="form-control" id="inventario" required>
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

const productos = ref([]);

const producto = ref(null);

const nombre = ref('');
const descripcion = ref('');
const precio = ref('');
const exclusivo = ref('');
const inventario = ref('');
const imagen = ref('');

    const cargarproductos = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/producto');
            productos.value = response.data;
        } catch (error) {
            console.error('Error al cargar productos:', error);
    }
    };

    onMounted(cargarproductos);

    const confirmarEliminar = () => {
        return confirm("Realmente desea eliminar un producto");
    };

    const eliminarproducto = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/producto/${id}`);
            // Actualizar la lista de productos después de eliminar
            cargarproductos();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };
    const AbrirModal = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/producto/${id}`);
            producto.value = response.data;
            nombre.value = producto.value.nombre;
            descripcion.value = producto.value.descripcion;
            precio.value = producto.value.precio;
            exclusivo.value = producto.value.id_perfil;
            inventario.value = producto.value.inventario;
            imagen.value = producto.value.imagen;
        } catch (error) {
            console.error('Error al editar producto:', error);
        }
    };

    const agregarproducto = () => {
        router.push({ name: 'agregarproducto' }); // Cambia '/formulario-producto' por la ruta correcta
    };

    const Editar = async () => {
        const productoNuevo = {
            id: producto.value.id,
            nombre: nombre.value,
            descripcion: descripcion.value,
            precio: precio.value,
            exclusivo: exclusivo.value,
            inventario: inventario.value,
            imagen: imagen.value 
        };

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/producto/${producto.value.id}`, productoNuevo);
            console.log('producto actualizado:', response.data);
            cargarproductos();
        } catch (error) {
            console.error('Error al editar producto:', error);
        }
    }
</script>

<style>
body{
  background: linear-gradient(to bottom, #000000, #424242);
  color: #ffffff;
}
</style>
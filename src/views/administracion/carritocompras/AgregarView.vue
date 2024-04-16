<template>
    <body>
        <div>a</div>
        <div class="espacio">
            <div class="container">
                <div class="col-md-12">
                <h2>Agregar Carrito Compras</h2>
                    <form @submit.prevent="agregarcarritocompras">
                        <div class="form-group">
                            <label for="id_usuario">id_usuario</label>
                            <input type="text" v-model="id_usuario" class="form-control" id="id_usuario" required>
                        </div>
                        <div class="form-group">
                            <label for="estado">estado</label>
                            <select v-model="estado" class="form-control" id="estado" required>
                                <option value="pendiente">Pendiente</option>
                                <option value="completado">Completado</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="total">total</label>
                            <input type="number" v-model="total" class="form-control" id="total" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Agregar Carrito Compras</button>
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

const id_usuario = ref('');
const estado = ref('');
const total = ref('');

const agregarcarritocompras = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/carritocompras', {
            id_usuario: id_usuario.value,
            estado: estado.value,
            total: total.value,
        });
        console.log('carritocompras agregado:', response.data);
        router.push({ name: 'listadocarritos' });
        // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
    } catch (error) {
        console.error('Error al agregar carritocompras:', error);
    }
};
</script>

<style>
body{
  background: linear-gradient(to bottom, #000000, #424242);
  color: #ffffff;
}
</style>
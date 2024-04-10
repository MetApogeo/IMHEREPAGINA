<template>
    <body>
        <div>a</div>
        <div class="espacio">
            <div class="container">
                <div class="col-md-12">
                <h2>Agregar producto</h2>
                    <form @submit.prevent="agregarproducto">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" v-model="nombre" class="form-control" id="nombre" required>
                        </div>
                        <div class="form-group">
                            <label for="descripcion">Descripcion </label>
                            <input type="text" v-model="descripcion" class="form-control" id="descripcion" required>
                        </div>
                        <div class="form-group">
                            <label for="precio">Precio</label>
                            <input type="number" v-model="precio" class="form-control" id="precio" required>
                        </div>
                        <div class="form-group">
                            <label for="exclusivo">Exclusivo</label>
                            <input type="number" v-model="exclusivo" class="form-control" id="exclusivo" required>
                        </div>
                        <div class="form-group">
                            <label for="inventario">Inventario</label>
                            <input type="number" v-model="inventario" class="form-control" id="inventario" required>
                        </div>
                        <div class="form-group">
                            <label for="imagen">Imagen</label>
                            <input type="text" v-model="imagen" class="form-control" id="imagen">
                        </div>
                        <button type="submit" class="btn btn-primary">Agregar producto</button>
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
const descripcion = ref('');
const precio = ref('');
const exclusivo = ref('');
const inventario = ref('');
const imagen = ref('');

const agregarproducto = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/producto', {
            nombre: nombre.value,
            descripcion: descripcion.value,
            precio: precio.value,
            exclusivo: exclusivo.value,
            inventario: inventario.value,
            imagen: imagen.value
        });
        console.log('producto agregado:', response.data);
        router.push({ name: 'listadoproductos' });
        // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
    } catch (error) {
        console.error('Error al agregar producto:', error);
    }
};
</script>
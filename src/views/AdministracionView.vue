<template>
    <body>
        <div>a</div>
        <div class="espacio">
            <div class="usuarios">
                <h3>Usuarios</h3>
                <div class="botones">
                    <button @click="irListadoUsuarios">Listado</button>
                </div>
            </div>
            <div class="carritos">
                <h3>CarritoCompras</h3>
                <div class="botones">
                    <button @click="irListadoCarrito">Listado</button>
                </div>
            </div>
            <div class="productos">
                <h3>Productos</h3>
                <div class="botones">
                    <button @click="irListadoProductos">Listado</button>
                </div>
            </div>
            
        </div>
    </body>
</template>

<script setup>
    import { useStore } from 'vuex'
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import store from '../store/store.js';

    const router = useRouter()

    const irListadoUsuarios = () => {
        router.push({ name: 'listadousuarios' });
        console.log("Ir a listado de usuarios");
    };
    const irListadoCarrito = () => {
        router.push({ name: 'listadocarritos' });
        console.log("Ir a listado de carritos");
    };
    const irListadoProductos = () => {
        router.push({ name: 'listadoproductos' });
        console.log("Ir a listado de productos");
    };
</script>
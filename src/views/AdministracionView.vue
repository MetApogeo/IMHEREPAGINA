<template>
    <body>
        <div>a</div>
        <div class="espacio">
            <div class="container text-center">
                <div class="row">
                    <div class="col ">
                    <div class="row ">
                        <h1 class="user">Usuarios</h1>
                    </div>
                    <div class="row ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="410" height="410" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                    </div>
                    <div class="row button">
                        <button @click="irListadoUsuarios" type="button" class="btn btn-outline-light">Acceder</button>
                    </div>
                    </div>
                    <div class="col">
                    <div class="row">
                        <h1 class="user">Carrito de compras</h1>
                    </div>
                    <div class="row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="410" height="410" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
            </div>
            <div class="row button">
                <button @click="irListadoCarrito" type="button" class="btn btn-outline-light">Acceder</button>
            </div>
            </div>
            <div class="col">
            <div class="row">
                <h1 class="user">productos</h1>
            </div>
            <div class="row">
                <svg xmlns="http://www.w3.org/2000/svg" width="410" height="410" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16" >
        <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
        <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
        </svg>
    </div>
        <div class="row button">
            <button @click="irListadoProductos" type="button" class="btn btn-outline-light">Acceder</button>
        </div>
        </div>
    </div>
    </div>
    </div>
    </body>

</template>

<style scoped>
body{
    background-image: url(../assets/IMG/gris.jpg);
    background-size: cover; /* Para que la imagen cubra todo el fondo */
    background-attachment: fixed;
}
.user{
color: white;
}
.button{
    margin-top: 30px;
    width: 10rem;
    margin-left: 30%;
}
.bi{
    color: white;
}
.carta{
    border-top: 1px solid blue;
    border-right: 2px dashed green;
    border-bottom: 3px dotted orange;
    border-left: 4px double purple;
}
</style>
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
<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  user: Object // Define el tipo de la propiedad user
});

</script>
<template >
<nav class="navbar navbar-expand-lg navbar-dark bg-white navb">
    <div class="container-fluid">
    <router-link class="navbar-brand" to="/">
        <img class="logo-animado" src="../assets/IMG/oso.png" alt="Logo" style="width: 7rem; padding-right: 3rem;" >
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
        <li class="nav-item" >
            <router-link class="nav-link text-dark" style="font-size: 15px;" to="/">Inicio</router-link>
        </li>
        <li class="nav-item" v-if="props.user && props.user.id_perfil === 1">
            <router-link class="nav-link text-dark" style="font-size: 15px;" to="/dashboard">Dashboard</router-link>
        </li>
        <li class="nav-item" v-if="props.user && props.user.id_perfil === 1">
            <router-link class="nav-link text-dark" style="font-size: 15px;" to="/administracion">Administracion</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link text-dark" style="font-size: 15px;"  to="/perfil">Perfil</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link text-dark" style="font-size: 15px;" to="/tienda">Tienda</router-link>
        </li>
        <li class="nav-item">
            <!-- <a class="btn bg-secondary btn-md border border-dark"style="font-size: 0.90rem;" href="#">¡JUGAR AHORA!</a> -->
            <button type="button" class="btn btn-outline-light">¡JUGAR AHORA!</button>
        </li>
        </ul>
    </div>
    </div>
</nav>
</template>

<style scoped>
.navbar {
display: flex;
align-items: center;
justify-content: space-between;
height: 80px;
position: fixed;
width: 100%;
z-index: 100;
box-shadow: 0px 2px 4px rgba(255, 255, 255, 0.3);
padding-top: 0;
padding-bottom: 0;
margin: 0;
position: 0;


}
.navb{
background: linear-gradient(to right, #ffffff, #a6a6a4d2);
}
.navbar .nav-item .nav-link{
letter-spacing: 1px;
justify-content: space-between;

}
.navbar .nav-item:last-child .btn {
margin-top: 0.40rem;
margin-left: 6px;
}

.container{
padding: 0;
}

.nav-link{
margin-top: 2px;
margin-left: 2px;
margin-right: 2px;


}

</style>
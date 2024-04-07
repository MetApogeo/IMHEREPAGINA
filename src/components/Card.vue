<template>
    <div class="card">
        <img :src="producto.thumbnailUrl" :alt="`imagen ${producto.title}`" class="card-img-top" />
        <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text">$ <span>{{producto.precio}}</span></p>
        <button class="btn btn-dark" @click="comprar(producto)">Comprar</button>
        </div>
    </div>
</template>

<script>
import {useStore} from 'vuex'
export default {
    props: ['producto'],
    setup(){
        const store = useStore()
        const comprar = producto => {
            store.dispatch('agregarCarrito', producto)
        }
        return {comprar}
    }
}
</script>

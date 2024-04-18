// store.js

import { createStore } from 'vuex'
import carrito from './modules/carrito';
import { obtenerProductos } from '../api/api';


const TOKEN_KEY = 'myAppToken';

const store = createStore({
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY) || null,
            user: null,
            carrito:[],
            
        }
    },
    mutations: {
        setToken(state, token) {
        state.token = token;
        localStorage.setItem(TOKEN_KEY, token);
        },
        clearToken(state) {
        state.token = null;
        localStorage.removeItem(TOKEN_KEY);
        },
        setUser(state, user) {
            state.user = user
        },
        setProductos(state, payload) {
            state.productos = payload
        },
        setCarrito(state, payload) {
            state.carrito.push(producto);
        },
        setVaciar(state) {
            state.carrito = {}
        },
        aumentar(state, payload) {
            state.carrito[payload].cantidad = state.carrito[payload].cantidad + 1
        },
        disminuir(state, payload) {
            state.carrito[payload].cantidad = state.carrito[payload].cantidad - 1
            if (state.carrito[payload].cantidad === 0) {
                delete state.carrito[payload]
            }
        },
        SET_CARRITO(state, carrito) {
            // Si carrito es un array, puedes usar un método para copiar sus elementos en el array existente
            state.carrito.splice(0, state.carrito.length, ...carrito);
        },
    },
    actions: {
        async cargarCarrito({ commit }) {
            try {
                // Obtener la lista de productos desde la API
                const productos = await obtenerProductos();
    
                // Consultar el carrito desde localStorage
                const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
                // Filtrar los productos que están en el carrito
                const productosEnCarrito = productos.filter(producto => carrito.includes(producto.id));
    
                // Actualizar el estado del carrito en Vuex
                commit('SET_CARRITO', productosEnCarrito);
            } catch (error) {
                console.error('Error al cargar el carrito:', error);
                // Aquí podrías manejar el error de acuerdo a tus necesidades
            }
        },
    },
    getters: {
        totalCarrito(state) {
            return state.carrito.reduce((total, producto) => total + producto.precio, 0);
        },
    },
    modules: {
        
    },
})

export default store


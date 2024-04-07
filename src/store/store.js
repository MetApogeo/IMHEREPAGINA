// store.js

import { createStore } from 'vuex'

const TOKEN_KEY = 'myAppToken';

const store = createStore({
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY) || null,
            user: null,
            
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
            state.carrito[payload.id] = { ...payload }
            console.log(state.carrito)
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
        }
    },
    actions: {
        
    },
    getters: {
        
    }
})

export default store


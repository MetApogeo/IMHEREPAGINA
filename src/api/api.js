// En un archivo api.js o donde manejes las llamadas a la API

import axios from 'axios';

export const obtenerProductos = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/producto');
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

export const cargarCarrito = async ({ commit }) => { 
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
};

export const calcularTotalCarrito = (productosEnCarrito) => {
    return productosEnCarrito.reduce((total, producto) => total + producto.precio, 0);
};


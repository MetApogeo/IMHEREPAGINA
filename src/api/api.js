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

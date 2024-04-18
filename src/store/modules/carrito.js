// store/modules/carrito.js
import axios from 'axios';

const state = {
  listaCarrito: [],
};

const getters = {
  totalCarrito: state => state.listaCarrito.reduce((total, producto) => total + producto.precio, 0).toFixed(2),
};

const actions = {
  async cargarCarrito({ commit }) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/producto');
      commit('setCarrito', response.data);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  },
};

const mutations = {
  setCarrito(state, carrito) {
    state.listaCarrito = carrito;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

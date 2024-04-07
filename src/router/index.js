import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // LINKEO DEL INICIO
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/RegistrarseView.vue')
    },
    // LINKEO DE LA TIENDA
    {
      path: '/tienda',
      name: 'tienda',
      component: () => import('../views/TiendaView.vue')
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: () => import('../views/CarritoView.vue')
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('../views/RegistroView.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/PerfilView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashBoardsView.vue')
    },
    
    {
      path: '/administracion',
      name: 'administracion',
      component: () => import('../views/AdministracionView.vue')
    },

    // TODO: ADMINISTRACION

      // ? USUARIOS
      {
        path: '/admin/usuarios',
        name: 'listadousuarios',
        component: () => import('../views/administracion/usuarios/ListadoView.vue')
      },
      {
        path: '/admin/usuario/agregar',
        name: 'agregarusuario',
        component: () => import('../views/administracion/usuarios/AgregarView.vue')
      },

      // ? CARRITO COMPRAS
      {
        path: '/admin/carritos',
        name: 'listadocarritos',
        component: () => import('../views/administracion/carritocompras/ListadoView.vue')
      },

      // ? PRODUCTOS
      {
        path: '/admin/productos',
        name: 'listadoproductos',
        component: () => import('../views/administracion/productos/ListadoView.vue')
      },

  ]
})

export default router

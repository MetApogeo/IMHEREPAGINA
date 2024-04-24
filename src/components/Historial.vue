<script setup>
    import { ref, defineProps, onMounted } from 'vue';
    import axios from 'axios';

    const props = defineProps({
    user: Object // Define el tipo de la propiedad user
    });

    const historial = ref([]);
    const detalles = ref([]);
    const detalle = ref([]);
    const mostrar = ref(false);
    const mostrarDetalles = ref({}); // Declarar mostrarDetalles como un ref
    // Crear un array ref para almacenar los productos
    const productos = ref([]);

    const cargarHistorial = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/carritocompras`);
        historial.value = response.data.filter(compra => compra.id_usuario === props.user.id);
        historial.value.forEach(carrito => {
            mostrarDetalles.value[carrito.id] = false;
        });
        console.log(historial.value)
    } catch (error) {
        console.error('Error al cargar el historial de compras:', error);
    }
    };

    onMounted(cargarHistorial);

    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    };

    
    const toggleDetalles = async (carritoId) => {
        // Verificar si ya se han cargado los detalles de la transacción
        
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/detalletransaccion');
                detalles.value = response.data.filter(carrito => carrito.id_carrito === carritoId)
                console.log(carritoId);
                console.log(detalles.value);

                // Obtener un conjunto único de id_producto
                const idProductos = new Set(detalles.value.map(detalle => detalle.id_producto));

                // Obtener los detalles de los productos correspondientes a los id_producto
                const responseProductos = await Promise.all(
                    [...idProductos].map(async idProducto => {
                        return await axios.get(`http://127.0.0.1:8000/api/producto/${idProducto}`);
                    })
                );

                // Limpiar el array productos antes de agregar los nuevos productos
                productos.value.splice(0);

                // Asociar los detalles del producto con los detalles de transacción
                detalles.value.forEach(detalle => {
                    const detalleProductos = responseProductos.filter(resp => resp.data.id === detalle.id_producto);
                    detalle.productos = detalleProductos.map(resp => resp.data);
                    productos.value.push(...detalle.productos);
                });

                console.log('detalles actualizados', detalles.value);
                console.log('Productos:', productos.value);
                //historial.value.find().detallesTransaccion = response.data;
                //console.log(historial.value.find(carrito => carrito.id === carritoId).detallesTransaccion);

                
                // Alternar la visibilidad del carrito seleccionado
                mostrarDetalles.value[carritoId] = !mostrarDetalles.value[carritoId];

                // Cerrar los detalles de los otros carritos si están abiertos
                Object.keys(mostrarDetalles.value).forEach(key => {
                    if (key !== carritoId.toString()) {
                        mostrarDetalles.value[key] = false;
                    }
                });
                 // Mostrar solo el detalle del carrito seleccionado
                console.log(mostrarDetalles.value[carritoId]);

                mostrar.value = mostrarDetalles.value[carritoId];
                console.log(mostrar);
            } catch (error) {
                console.error('Error al obtener los detalles de la transacción:', error);
            }
    };


</script>

<template>
    <div>
            <div class="container">
                <div class="col-md-12">
                    <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="carrito in historial" :key="carrito.id">
                                <tr>
                                    <td>
                                        <!-- Mostrar icono de flecha -->
                                        <span @click="toggleDetalles(carrito.id)" class="mostrar-detalles">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16" :class="{ 'rotated': mostrarDetalles[carrito.id] }">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                        </span>
                                    </td>
                                    <td>{{ carrito.estado }}</td>
                                    <td>{{ formatearFecha(carrito.created_at) }}</td>
                                    <td>{{ carrito.total }}</td>
                                </tr>
                                <tr v-show="mostrar">
                                    <td colspan="4" v-if="mostrarDetalles[carrito.id]">
                                        <ul>
                                            <li v-for="producto in productos" :key="producto.id">
                                                {{ producto.nombre }}, Precio: {{ producto.precio }}
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        

</template>

<style>
.mostrar-detalles {
    cursor: pointer;
}

.rotated {
    transform: rotate(180deg);
}
</style>
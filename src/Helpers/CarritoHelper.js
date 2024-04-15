export default class CarritoHelper {
    static getCarrito() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    static addCarrito(producto, ) {
        const cart = this.getCarrito();
        const existeProducto = cart.find(item => item.id === producto.id);
        if (existeProducto) {
            'el producto ya está en el carrito';
        } else {
            cart.push({ ...producto});
        }
        localStorage.setItem('carrito', JSON.stringify(cart));
    }

    static removeCarrito(productoId) {
        const cart = this.getCarrito().filter(item => item.id !== productoId);
        localStorage.setItem('carrito', JSON.stringify(cart));
    }

    static clearCarrito() {
        localStorage.removeItem('carrito');
    }
}
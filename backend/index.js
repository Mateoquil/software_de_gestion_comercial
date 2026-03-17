
// const baseDeDatos = []
// class productos {
//     n_Producto
//     unidad
//     precio

//     constructor(n_Producto, unidad, precio) {
//         this.n_Producto = n_Producto
//         this.unidad = unidad
//         this.precio = precio
//     }

// // Crea el producto
//     crear() {
//         const crearProductos = {
//             n_Producto: this.n_Producto,
//             unidad: this.unidad,
//             precio: this.precio
//         }
//         baseDeDatos.push(crearProductos)
//         return baseDeDatos
//     }

// // Busqueda del producto
// buscar() {
//     for(const diccionario of baseDeDatos) {
//         if(diccionario.n_Producto === this.n_Producto) {
//             return diccionario
//         }
//     }
//     return "No se encontró el producto"
// }

// // Elimina el producto
//     eliminar() {
//     for(let i = 0; i < baseDeDatos.length; i++) {
//         if(baseDeDatos[i].n_Producto === this.n_Producto) {
//             baseDeDatos.splice(i, 1)
//             return baseDeDatos
//         }
//     }
//     return "Se eliminó el producto"
// }
// }

// // Creacion de un producto
// const producto = new productos("papitas", 10, 1200)
// const producto1 = producto.crear()
// console.log(producto1)

// // Buscar un producto
// const buscar = producto.buscar()
// console.log("buscar:", encontrado)

// // Eliminar un producto
// const despuesDeEliminar = producto.eliminar()
// console.log("Después de eliminar:", despuesDeEliminar)
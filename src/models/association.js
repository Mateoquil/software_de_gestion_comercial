import etiquetas from "./etiquetas.js"
import producto from "./productos.js"
import ticketdeventa from "./ticketdeventa.js"
import ticketdeventaproductos from "./ticketdeventaproductos.js"
import etiquetaProductos from "./etiqueta-productos.js"

// Un producto pertenece a una etiqueta
// producto.belongsToMany(etiquetas, {through:etiquetaProductos, foreignKey: "productoId", as: 'etiquetas' });
// etiquetas.belongsToMany(producto, { through:etiquetaProductos,foreignKey: "etiquetaId",as: 'productos' });
producto.belongsToMany(etiquetas, {
    through: etiquetaProductos,
    foreignKey: "productoId",
    otherKey: "etiquetaId",
    as: "etiquetas"
})

etiquetas.belongsToMany(producto, {
    through: etiquetaProductos,
    foreignKey: "etiquetaId",
    otherKey: "productoId",
    as: "productos"
})



producto.belongsToMany(ticketdeventaproductos,{foreignKey:"idTicketDeVentaProductos"})
ticketdeventa.hasMany(ticketdeventaproductos,{foreignKey:"idTicketDeVentaProductos"})

export {
    etiquetas,
    producto,
    ticketdeventa,
    ticketdeventaproductos,
    etiquetaProductos
}
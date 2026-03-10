import etiquetas from "./etiquetas.js"
import producto from "./productos.js"
import ticketdeventa from "./ticketdeventa.js"
import ticketdeventaproductos from "./ticketdeventaproductos.js"

// Un producto pertenece a una etiqueta
producto.belongsTo(etiquetas, { foreignKey: "etiquetaId", as: 'etiquetas' });
etiquetas.hasMany(producto, { foreignKey: "etiquetaId",as: 'productos' });

producto.belongsTo(ticketdeventaproductos,{foreignKey:"idTicketDeVentaProductos"})
ticketdeventa.hasMany(ticketdeventaproductos,{foreignKey:"idTicketDeVentaProductos"})

export {
    etiquetas,
    producto,
    ticketdeventa,
    ticketdeventaproductos
}
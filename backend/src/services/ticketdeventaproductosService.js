import  ticketdeventaproductos  from "../models/ticketdeventaproductos.js";
import  productos  from "../models/productos.js";


class ticketdeventaproductosService{
   async create(metodoDePagoTicket, precioTotalTicket) {
        try {
            const randomNumeroDeComprobante = Math.random().toString(36).substring(2, 12).toUpperCase();

            const crearTicket = await ticketDeVenta.create({
                metodoDePago: metodoDePagoTicket,
                precioTotal: precioTotalTicket,
                numeroDeComprobante: randomNumeroDeComprobante
            });
            
            if (!crearTicket) {
                throw new Error("error al crear un ticket en la db");
            }
            
            return {
                id: crearTicket.id,
                metodoDePago: crearTicket.metodoDePago,
                precioTotal: crearTicket.precioTotal,
                numeroDeComprobante: crearTicket.numeroDeComprobante,
                fecha: crearTicket.fecha
            };
        } catch (error) {
            console.log("error en ticket service al crear:", error);
        }
    }

    async findAll() {
        try {
            const { count, rows } = await ticketDeVenta.findAndCountAll();
            
            if (count === 0) {
                throw new Error("No se encontraron tickets");
            }
            
            return {
                cantidad: count,
                tickets: rows
            };
        } catch (error) {
            console.log("error en ticket service al encontrar:", error);
        }
    }

    async findOne(idTicket) {
        try {
            const ticketEncontrado = await ticketDeVenta.findByPk(idTicket);
            
            if (!ticketEncontrado) {
                throw new Error("ticket no encontrado");
            }
            
            return ticketEncontrado;
        } catch (error) {
            console.log("error en ticket service al encontrar:", error);
        }
    }

    async delete(ticketId) {
        try {
            const ticketExiste = await this.findOne(ticketId);
            
            if (!ticketExiste) {
                throw new Error("ticket no encontrado");
            }
            
            const eliminarTicket = await ticketDeVenta.destroy({ where: { id: ticketId } });
            
            return { mensaje: "ticket eliminado con exito", eliminarTicket };
        } catch (error) {
            console.log("error en ticket service al eliminar:", error);
        }
    }
}

export default ticketdeventaproductosService
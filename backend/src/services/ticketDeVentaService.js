import  ticketdeventa  from "../models/ticketdeventa.js";
import  productos  from "../models/productos.js";

class TicketDeVentaService{
    async create(metodoDePagoTicket, precioTotalTicket,){
        try{
            const crearTicketDeVenta = await ticketdeventa.create({
                metodoDePago: metodoDePagoTicket,
                precioTotal: precioTotalTicket
            })
            return crearTicketDeVenta
        }catch(error){
            console.log("error en ticket de venta service al crear:",error)            
        }
    }

    async findAll(){
        try{
            const {count, rows} = await productos.findAndCountAll()
            if(count === 0){
                throw new Error("No se encontraron productos")
            }
            return {
                cantidad:count,
                etiquetas:rows// [{devuelve todos los producto}]
            }
        }catch(error){
            console.log("error en etiqueta service al crear:",error)            
        }
    }

    async findOneById(id){
        try{
            const idEncontrado = await id.findOne({where:{id:id}})
            if(!idEncontrado){
                throw new Error("id no encontrado")
            }
            return idEncontrado
        }catch(error){
            console.log("error en id service al crear:",error)            
        }
    }
}
export default TicketDeVentaService

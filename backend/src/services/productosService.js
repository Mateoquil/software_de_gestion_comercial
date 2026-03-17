import Productos from "../models/productos.js";

// listar
// traer
// eliminar
// actualizar
class ProductoService{
    async create(nombreProducto, precioProducto, stockProducto, urlProducto,activoProducto, etiquetaIdProducto){
        
        try{

            const productoEncontrado = await Productos.findOne({where:{nombre:nombreProducto}})

            if(productoEncontrado){
                throw new Error("nombre del producto ya existe")
            }
            const crearProducto = await Productos.create({
                nombre: nombreProducto,
                precio: precioProducto,
                stock: stockProducto,
                url: urlProducto,
                activo: activoProducto,
                etiquetaId: etiquetaIdProducto
            })
            return crearProducto
            
        }catch(error){
            console.log("error en producto service al crear:",error)            
        }
    }

    async updateProducto(idProducto,nombreProducto, precioProducto, stockProducto, urlProducto,activoProducto, etiquetaIdProducto){
        try{
            const productoExiste = this.findOne(idProducto)
            if(!productoExiste){
                throw new Error("el producto no existe")
            }


            // si nombre producto es null entonces lo llena con el nombre original
            const crearProducto = await Productos.update({
                nombre: nombreProducto ?? productoExiste.nombre,
                precio: precioProducto ?? productoExiste.precio,
                stock: stockProducto ?? productoExiste.stock,
                url: urlProducto ?? productoExiste.url,
                activo: activoProducto ?? productoExiste.activo,
                etiquetaId: etiquetaIdProducto ?? productoExiste.etiquetaId
            },{where:{id:idProducto}})
            console.log("Producto actualizado:", crearProducto.toJSON())
            
        }catch(error){
            console.log("error en producto service al actualizar:",error)            
        }
    }

    async findAll(){
        try{
            const {count, rows} = await Productos.findAndCountAll()
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

    async findOneById(idProducto){
        try{
            const productoEncontrado = await Productos.findOne({where:{id:idProducto}})
            if(!productoEncontrado){
                throw new Error("producto no encontrado")
            }
            return productoEncontrado
        }catch(error){
            console.log("error en producto service al crear:",error)            
        }
    }

    async findOneByName(nombreProducto){
        try{
            const productoEncontrado = await Productos.findOne({where:{nombre:nombreProducto}})
            if(!productoEncontrado){
                throw new Error("producto no encontrado")
            }
            return productoEncontrado
        }catch(error){
            console.log("error en producto service al crear:",error)            
        }
    }

    async delete(idProducto){
        try{
            const productoExiste = await this.findOneById(idProducto)
            if(!productoExiste){
                throw new Error("producto no encontrado")
            }
            const eliminarProducto = await Productos.destroy({where:{id:idProducto}})
            return {mensaje:"producto eliminado con exito"}
        }catch(error){
            console.log("error en producto service al eliminar:",error)            
        }
    }
}

export default ProductoService
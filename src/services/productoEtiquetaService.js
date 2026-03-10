import productos from '../models/productos.js';
import etiquetas from '../models/etiquetas.js';

class ProductoEtiqueta {


    async TraerProductoConEtiquetasPorNombre(nombreDelProducto) {
        try {
            const productosConEtiquetas = await productos.findOne({
                where:{nombre:nombreDelProducto},
                include: [{
                    model: etiquetas,
                    as: 'etiquetas',
                    through: { attributes: [] }
                }]
            });
            return productosConEtiquetas;
        } catch (error) {
            console.error('Error al traer productos con etiquetas:', error);
            throw error;
        }
    }

    async TraerProductosConEtiquetas() {
        try {
            const [count,rows ] = await productos.findAndCountAll({
                include: [{
                    model: etiquetas,
                    as: 'etiquetas',
                    through: { attributes: [] }
                }]
            });
            return {
                count,
                productos: rows
            };
        } catch (error) {
            console.error('Error al traer productos con etiquetas:', error);
            throw error;
        }
}



}
export default ProductoEtiqueta;
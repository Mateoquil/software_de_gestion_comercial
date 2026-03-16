import ProductoEtiquetaservices  from '../services/productoEtiquetaService.js';
class DashboardController {
    

    traerTodosLosProductos = async (req, res) => {
        try {
            console.log('hola')
            console.log('hola')
            console.log('hola')
            const productoEtiquetaservices = new ProductoEtiquetaservices();
            const ProductosConEtiqueta = await productoEtiquetaservices.TraerProductosConEtiquetas();
            res.status(200).json(ProductosConEtiqueta);
        } catch (error) {
            console.error('Error al buscar los productos:', error);
            res.status(500).json({ error: 'Error al buscar los productos' });
        }
    }

    traerProductoPorNombre = async (req, res) => {
        try{
            console.log("estoy en productos por nombre")
            const nombreNormalizado = req.params.nombre.toLowerCase().trim();

            const productoEtiquetaservices = new ProductoEtiquetaservices(); 
            const traerProductoPorNombreConEtiqueta = await productoEtiquetaservices.TraerProductoConEtiquetasPorNombre(nombreNormalizado);
            res.status(200).json(traerProductoPorNombreConEtiqueta);            
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            res.status(500).json({ error: 'Error al buscar el producto' });
        }
    }

    
}

export default DashboardController;
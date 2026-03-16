import ProductoService from '../services/productosService.js';
import EtiquetaService from '../services/etiquetasService.js';
class CrearController {

    // validar crear producto y crear etiqueta

    crearProductos = async (req, res) => {
        try {
            const datos = req.body
            if (!datos.nombre || !datos.precio || !datos.stock || !datos.etiquetaId) {
                return res.status(400).json({ error: 'Faltan datos obligatorios' });
            }
            const nombreValido = datos.nombre.trim();
            const precioValido = datos.precio;
            const stockValido = datos.stock;
            const etiquetaValida = datos.etiqueta;
            const urlValida = datos.url.trim();

            const service = new ProductoService();
            const productos = await service.create(nombreValido, precioValido, stockValido, urlValida, datos.activo, etiquetaValida);
            if(!productos){
                return res.status(400).json({ error: 'No se pudo crear el producto' });
            }

            res.status(201).json({productos});
        } catch (error) {
            console.error('Error al buscar los productos:', error);
            res.status(500).json({ error: 'Error al buscar los productos' });
        }
    }

    crearEtiquetas = async (req, res) => {
        try {
            const datos = req.body 
            if (!datos.tipo) {
                return res.status(400).json({ error: 'Faltan datos obligatorios' });
            }
            const nombreValido= datos.tipo.trim();

            const service = new EtiquetaService();
            const etiqueta = await service.create(nombreValido);
            if (!etiqueta) {
                return res.status(400).json({ error: 'No se pudo crear la etiqueta' });
            }
            res.status(201).json({
                message: 'Etiqueta creada exitosamente',
                etiquetaId: etiqueta.id,
                etiquetaNombre: etiqueta.tipo,

            });
        } catch (error) {
            console.error('Error al buscar los productos:', error);
            res.status(500).json({ error: 'Error al buscar los productos' });
        }
    }
}

export default CrearController;
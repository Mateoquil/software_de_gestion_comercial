import { Router } from "express";
import CrearController from "../controllers/cargar.controller.js";
const router = Router();

const cargar = new CrearController()
router.post("/cargar-etiquetas", cargar.crearEtiquetas);
router.post("/cargar-productos", cargar.crearProductos);


export default router;
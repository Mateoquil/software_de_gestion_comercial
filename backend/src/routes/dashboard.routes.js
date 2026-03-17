import { Router } from "express"
import DashboardController from "../controllers/dashboard.controller.js"
const router = Router()

const dashboardController = new DashboardController()
router.get("/traer-productos", dashboardController.traerTodosLosProductos)
router.get("/traer-producto/:nombre", dashboardController.traerProductoPorNombre)
// router.post(process.env.DASHBOARD, (req, res) => {
//     res.send("dashboard")
// })

export default router
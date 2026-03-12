import sequelize from './src/configDatabase/config.js';
import { etiquetas, producto, ticketdeventa, ticketdeventaproductos, etiquetaProductos } from './src/models/association.js';
import express from "express";
import dashboard from "./src/routes/dashboard.routes.js";
import Crear from "./src/routes/cargar.routes.js";

const app = express();

app.use(express.json());

// Ruta principal
app.use("/api", dashboard);
app.use("/api", Crear);

async function sincronizar() {
    try {
        await sequelize.sync({ alter: false });
        console.log("✅ Sincronización exitosa - Todas las tablas han sido creadas/actualizadas");
    } catch (error) {
        console.log("❌ Error en la sincronización:", error.message);
    }
}

sincronizar();

app.get("/health/", (req, res) => {
    res.send("it's working");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


// import sequelize from './src/configDatabase/config.js';
// import { etiquetas, producto, ticketdeventa, ticketdeventaproductos } from './src/models/association.js';
// import express from "express"
// import dashboard from "./src/routes/dashboard.routes.js"


// const app = express()
// app.use(express.json())
// app.use("/api",dashboard)
//     |
// async function sincronizar() {
//     try {
//         // Sincroniza todas las tablas con los modelos
//         await sequelize.sync({ alter: true });
//         console.log("✅ Sincronización exitosa - Todas las tablas han sido creadas/actualizadas");
//     } catch (error) {
//         console.log("❌ Error en la sincronización:", error.message);
//     }
// }
// sincronizar();

// // app.get(/health/, (req, res) => {
// // res.send("it's working");
// // });

// app.listen(3000, () => {
// console.log("Server is running on port 3000");
// })


// app.express()
























































//import express from 'express';


//const app = express();



//app.use(express.json());

//(req, res) => requiere y responde
//app.get(/health/, (req, res) => {
//res.send("hello");
//});

//app.listen(3000, () => {
//console.log("Server is running on port 3000");
//

//app.express














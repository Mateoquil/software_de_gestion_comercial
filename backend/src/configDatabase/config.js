import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log("Base de datos:", process.env.NAME_DB)
console.log("Usuario:", process.env.User)
console.log("Host:", process.env.HOST)
console.log("Puerto:", process.env.PORT)


const sequelize = new Sequelize(
    process.env.NAME_DB,
    process.env.User,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: process.env.DIALECT || "mysql",
    }
);

async function conectar() {
    try {
        await sequelize.authenticate();
        console.log("Conexión establecida con éxito.");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
}

conectar();
export default sequelize;


// nombreDeLaBase de datos -> nombre de la cuenta -> donde se va conectar -> nombre de la base de datos
// mysql:
// root:admi → usuario y contraseña
// @localhost → host
// :3306 → puerto
// /ecommerce → base de datos
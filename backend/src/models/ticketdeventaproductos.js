import sequelize from "../configDatabase/config.js";
import { DataTypes } from "sequelize";



const ticketdeventaProductos = sequelize.define("ticketdeventa", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cantidad:{ type: DataTypes.INTEGER}
}, {
    tableName: "ticketdeventa",
})
export default ticketdeventaProductos
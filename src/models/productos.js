import sequelize from "../configDatabase/config.js";
import { DataTypes } from "sequelize";

const producto = sequelize.define("producto", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    url: { type: DataTypes.STRING(500), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    ticketDeVentaProductos: { type: DataTypes.INTEGER, allowNull: true },
    idTicketDeVentaProductos:{type:DataTypes.INTEGER}
}, {
    tableName: "producto",
})
export default producto
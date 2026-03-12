import { DataTypes } from "sequelize";
import sequelize from "../configDatabase/config.js";


const etiquetaProductos = sequelize.define('etiquetaProductos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    producto: { type: DataTypes.INTEGER, allowNull: false },
    etiquetaId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'etiquetaProductos',
    timestamps: false
})
export default etiquetaProductos





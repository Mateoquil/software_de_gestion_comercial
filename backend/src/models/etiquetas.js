import { DataTypes } from "sequelize";
import sequelize from "../configDatabase/config.js";


const etiquetas = sequelize.define('etiquetas', {
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    tipo: {type: DataTypes.STRING(50),allowNull: false,unique: true,validate: {notEmpty: true}}
}, {
    tableName: 'etiquetas',
    timestamps: false
})
export default etiquetas
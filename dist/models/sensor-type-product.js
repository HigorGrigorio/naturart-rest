"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorTypeProduct = void 0;
const sequelize_1 = require("sequelize");
class SensorTypeProduct extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            idProduct: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            idSensorType: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
        }, { sequelize: sequelize, tableName: 'sensortypeproduct' });
    }
    static associate(models) {
        this.hasMany(models.Measurement, {
            as: 'measures',
            foreignKey: 'idSensorTypeProduct'
        });
    }
}
exports.SensorTypeProduct = SensorTypeProduct;
//# sourceMappingURL=sensor-type-product.js.map
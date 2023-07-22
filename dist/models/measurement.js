"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Measurement = void 0;
const sequelize_1 = require("sequelize");
class Measurement extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            idSensorTypeProduct: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            value: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false
            },
            measurementDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
        }, { sequelize });
    }
    static associate(models) {
        this.belongsTo(models.SensorTypeProduct, {
            as: 'measurementInfo',
            foreignKey: 'idSensorTypeProduct'
        });
    }
}
exports.Measurement = Measurement;
//# sourceMappingURL=measurement.js.map
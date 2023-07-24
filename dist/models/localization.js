"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Localization = void 0;
const sequelize_1 = require("sequelize");
class Localization extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            latitude: {
                type: sequelize_1.DataTypes.NUMBER,
                allowNull: false
            },
            longitude: {
                type: sequelize_1.DataTypes.NUMBER,
                allowNull: false
            },
            idProduct: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            startDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            endDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
        }, { sequelize, tableName: 'localization' });
    }
    static associate(models) {
        this.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'idProduct'
        });
    }
}
exports.Localization = Localization;
exports.default = Localization;
//# sourceMappingURL=localization.js.map
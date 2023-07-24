"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            serialCode: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            idInvoiceItem: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
        }, { sequelize: sequelize, tableName: 'product' });
    }
    static associate(models) {
        this.belongsToMany(models.SensorType, {
            through: 'SensorTypeProduct',
            as: 'types',
            foreignKey: 'idProduct',
        });
        this.hasMany(models.Localization, {
            as: 'localizations',
            foreignKey: 'idProduct'
        });
    }
}
exports.Product = Product;
//# sourceMappingURL=product.js.map
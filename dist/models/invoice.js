"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const sequelize_1 = require("sequelize");
class Invoice extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            invoiceNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            invoiceDate: {
                type: sequelize_1.DataTypes.DATE,
            },
            invoiceValue: {
                type: sequelize_1.DataTypes.NUMBER,
            },
            idClient: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: true
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
        }, { sequelize: sequelize });
    }
    static associate(models) {
        this.belongsTo(models.Client, {
            as: 'client',
            foreignKey: 'idClient'
        });
        this.hasMany(models.InvoiceItem, {
            as: 'items',
            foreignKey: 'idInvoice'
        });
    }
}
exports.Invoice = Invoice;
//# sourceMappingURL=invoice.js.map
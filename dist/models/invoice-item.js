"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItem = void 0;
const sequelize_1 = require("sequelize");
class InvoiceItem extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            quantity: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            unitPrice: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            serialCode: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            idInvoice: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: true
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
        }, { sequelize: sequelize });
    }
    static associate(models) {
        this.belongsTo(models.Invoice, {
            as: 'invoice',
            foreignKey: 'idInvoice'
        });
    }
}
exports.InvoiceItem = InvoiceItem;
//# sourceMappingURL=invoice-item.js.map
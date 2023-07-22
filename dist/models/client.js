"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const sequelize_1 = require("sequelize");
class Client extends sequelize_1.Model {
    /**
     * Initialize a model into connection
     * @param sequelize Sequelize instance.
     */
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            cpf: {
                type: sequelize_1.DataTypes.STRING(11),
                allowNull: false
            },
            birthDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            telephone: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
        }, { sequelize: sequelize });
    }
    static associate(models) {
        this.belongsTo(models.Address, {
            as: 'address',
            foreignKey: 'idAddress'
        });
        this.hasMany(models.Invoice, {
            as: 'invoices',
            foreignKey: 'idClient'
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map
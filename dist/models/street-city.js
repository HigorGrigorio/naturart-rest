"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreetCity = void 0;
const sequelize_1 = require("sequelize");
class StreetCity extends sequelize_1.Model {
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
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
        }, { sequelize: sequelize });
    }
    /**
     * Create a database association to models instance.
     *
     * @param models Models of Sequelize instance.
     */
    static associate(models) {
        this.belongsTo(models.Street, {
            as: 'street',
            foreignKey: 'idStreet'
        });
        this.belongsTo(models.StreetType, {
            as: 'streetType',
            foreignKey: 'idStreetType'
        });
        this.belongsTo(models.City, {
            as: 'city',
            foreignKey: 'idCity'
        });
        this.hasMany(models.ZipCode, {
            as: 'cep',
            foreignKey: 'idStreetCity'
        });
        this.hasMany(models.Address, {
            as: 'address',
            foreignKey: 'idStreetCity'
        });
    }
}
exports.StreetCity = StreetCity;
//# sourceMappingURL=street-city.js.map
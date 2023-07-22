"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const sequelize_1 = require("sequelize");
class Address extends sequelize_1.Model {
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
            number: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            complement: {
                type: sequelize_1.DataTypes.STRING
            },
            idDistrictCity: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idStreetCity: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            },
            idZipCode: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
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
        this.belongsTo(models.ZipCode, {
            as: 'cep',
            foreignKey: 'idZipCode'
        });
        this.belongsTo(models.StreetCity, {
            as: 'streetCity',
            foreignKey: 'idStreetCity'
        });
        this.belongsTo(models.DistrictCity, {
            as: 'districtCity',
            foreignKey: 'idDistrictCity'
        });
        this.hasMany(models.Client, {
            as: 'clients',
            foreignKey: 'idAddress'
        });
    }
}
exports.Address = Address;
//# sourceMappingURL=address.js.map
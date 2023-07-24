"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictCity = void 0;
const sequelize_1 = require("sequelize");
class DistrictCity extends sequelize_1.Model {
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
        }, {
            sequelize: sequelize,
            tableName: 'districtcity'
        });
    }
    /**
     * Create a database association to models instance.
     *
     * @param models Models of Sequelize instance.
     */
    static associate(models) {
        this.hasMany(models.ZipCode, {
            as: 'districtCities',
            foreignKey: 'idDistrictCity'
        });
        this.hasMany(models.Address, {
            as: 'address',
            foreignKey: 'idDistrictCity'
        });
    }
}
exports.DistrictCity = DistrictCity;
//# sourceMappingURL=district-city.js.map
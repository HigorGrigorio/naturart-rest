"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const sequelize_1 = require("sequelize");
class City extends sequelize_1.Model {
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
                allowNull: false,
                unique: true
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
        }, {
            sequelize: sequelize,
            tableName: 'city'
        });
    }
    /**
     * Create a database association to models instance.
     *
     * @param models Models of Sequelize instance.
     */
    static associate(models) {
        this.belongsTo(models.State, {
            foreignKey: 'idState',
            as: 'state',
        });
        this.belongsToMany(models.District, {
            through: 'DistrictCity',
            foreignKey: 'idCity',
            as: 'districts'
        });
        this.hasMany(models.StreetCity, {
            as: 'streetsInfo',
            foreignKey: 'idCity'
        });
        this.hasMany(models.ZipCode, {
            as: 'zipCode',
            foreignKey: 'idCity'
        });
    }
}
exports.City = City;
//# sourceMappingURL=city.js.map
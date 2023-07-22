"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZipCode = void 0;
const sequelize_1 = require("sequelize");
class ZipCode extends sequelize_1.Model {
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
            code: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            idCity: {
                type: sequelize_1.INTEGER.UNSIGNED,
                allowNull: false,
            },
            idDistrictCity: {
                type: sequelize_1.INTEGER.UNSIGNED,
                allowNull: false,
            },
            idStreetCity: {
                type: sequelize_1.INTEGER.UNSIGNED,
                allowNull: false,
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
        }, { sequelize });
    }
    /**
     * Create a database association to models instance.
     *
     * @param models Models of Sequelize instance.
     */
    static associate(models) {
        this.belongsTo(models.City, {
            foreignKey: 'idCity',
            as: 'city'
        });
        this.belongsTo(models.DistrictCity, {
            foreignKey: 'idDistrictCity',
            as: 'districtCity'
        });
        this.belongsTo(models.StreetCity, {
            foreignKey: 'idStreetCity',
            as: 'streetInfo',
        });
        this.hasMany(models.Address, {
            foreignKey: 'idZipCode',
            as: 'address'
        });
    }
}
exports.ZipCode = ZipCode;
//# sourceMappingURL=zip-code.js.map
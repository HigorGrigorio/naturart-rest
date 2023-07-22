"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Street = void 0;
const sequelize_1 = require("sequelize");
class Street extends sequelize_1.Model {
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
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false,
                unique: true
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
        this.hasMany(models.StreetCity, {
            as: 'streetCities',
            foreignKey: 'idStreet'
        });
    }
}
exports.Street = Street;
//# sourceMappingURL=street.js.map
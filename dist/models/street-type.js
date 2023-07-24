"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreetType = void 0;
const sequelize_1 = require("sequelize");
class StreetType extends sequelize_1.Model {
    /**
     * Initialize a model into connection.
     *
     * @param sequelize Sequelize instance.
     */
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            initials: {
                type: new sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            name: {
                type: new sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            createdAt: sequelize_1.DataTypes.DATE,
            updatedAt: sequelize_1.DataTypes.DATE,
        }, { sequelize: sequelize, tableName: 'streettype' });
    }
    /**
     * Create a database association to models instance.
     *
     * @param models Models of Sequelize instance.
     */
    static associate(models) {
        this.hasMany(models.StreetCity, {
            as: 'streetCities',
            foreignKey: 'idStreetType'
        });
    }
}
exports.StreetType = StreetType;
//# sourceMappingURL=street-type.js.map
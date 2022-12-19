import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";

export class Localization extends Model<InferAttributes<Localization>, InferCreationAttributes<Localization>> {
    /**
     * Identifier of model
     */
    declare id: CreationOptional<number>;

    /**
     * Latitude of localization.
     */
    declare latitude: number;

    /**
     * Longitude of localization.
     */
    declare longitude: number;

    /**
     * Date of creating localization.
     */
    declare startDate: CreationOptional<Date>;

    /**
     * Date of end localization.
     */
    declare endDate: CreationOptional<Date>;

    /**
     * Date of creation.
     */
    declare createdAt: CreationOptional<Date>;

    /**
     * Date of last update.
     */
    declare updatedAt: CreationOptional<Date>;

    static initialize(sequelize: Sequelize): void {
        this.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            latitude: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            longitude: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {sequelize});
    }
}

export default Localization;
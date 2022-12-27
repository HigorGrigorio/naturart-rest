import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    ModelStatic,
    Sequelize
} from "sequelize";

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
    declare startDate: Date;

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

    /**
     * Identifier of product.
     */
    declare idProduct: number;

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
            idProduct: {
              type: DataTypes.INTEGER.UNSIGNED,
              allowNull: false,
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {sequelize});
    }

    public static associate(models: { [key: string]: ModelStatic<Model>; }) {
        this.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'idProduct'
        });
    }
}

export default Localization;
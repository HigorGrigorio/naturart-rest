import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    ModelStatic,
    Sequelize
} from "sequelize";

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    /**
     * Identifier in database.
     */
    declare id: CreationOptional<number>;

    /**
     * Name of product.
     */
    declare name: CreationOptional<string>;

    /**
     * Serial code related to the purchase item
     */
    declare serialCode: CreationOptional<string>;

    /**
     * Date of creation.
     */
    declare createdAt: CreationOptional<Date>;

    /**
     * Identifier of invoice item.
     */
    declare idInvoiceItem: CreationOptional<number>;

    /**
     * Date of last update.
     */
    declare updatedAt: CreationOptional<Date>;

    public static initialize(sequelize: Sequelize): void {
        this.init({
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },
                serialCode: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                idInvoiceItem: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {sequelize: sequelize});
    }

    public static associate(models: { [key: string]: ModelStatic<Model>; }) {
        this.belongsToMany(models.SensorType, {
            through: 'SensorTypeProduct',
            as: 'types',
            foreignKey: 'idProduct',
        });

        this.hasMany(models.Localization, {
            as: 'localizations',
            foreignKey: 'idProduct'
        });
    }
}
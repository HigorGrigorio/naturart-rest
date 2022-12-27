import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model, ModelStatic,
    Sequelize
} from "sequelize";
import {Invoice} from "./invoice";

export class InvoiceItem extends Model<InferAttributes<InvoiceItem>, InferCreationAttributes<InvoiceItem>> {
    /**
     * Identifier in database.
     */
    declare id: CreationOptional<number>;

    /**
     * Quantity products of purchase.
     */
    declare quantity: number;

    /**
     * Unit price of product purchase.
     */
    declare unitPrice: number;

    /**
     * Date of creation.
     */
    declare createdAt: CreationOptional<Date>;

    /**
     * Date of last update.
     */
    declare updatedAt: CreationOptional<Date>;

    /**
     * Code of purchase item.
     */
    declare serialCode: string;

    /**
     * Purchase for the item.
     */
    declare idInvoice: ForeignKey<Invoice['id']>;

    public static initialize(sequelize: Sequelize): void {
        this.init({
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },
                quantity: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                unitPrice: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                serialCode: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                idInvoice: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: true
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {sequelize: sequelize});
    }

    public static associate(models: { [key: string]: ModelStatic<Model>; }) {
        this.belongsTo(models.Invoice, {
            as: 'invoice',
            foreignKey: 'idInvoice'
        });
    }
}
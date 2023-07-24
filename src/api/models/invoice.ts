import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    ModelStatic,
    Sequelize
} from "sequelize";
import {Client} from "./client";

export class Invoice extends Model<InferAttributes<Invoice>, InferCreationAttributes<Invoice>> {
    /**
     * Identifier in database.
     */
    declare id: CreationOptional<number>;

    /**
     * Number of the invoice.
     */
    declare invoiceNumber: string;

    /**
     * Date the invoice was made
     */
    declare invoiceDate: Date;

    /**
     * Value of the invoice.
     */
    declare invoiceValue: number;

    /**
     * Date of creation.
     */
    declare createdAt: CreationOptional<Date>;

    /**
     * Date of last update.
     */
    declare updatedAt: CreationOptional<Date>;

    /**
     * Customer who made the purchase
     */
    declare idClient: ForeignKey<Client['id']>;

    public static initialize(sequelize: Sequelize): void {
        this.init({
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },
                invoiceNumber: {
                    type: DataTypes.STRING,
                },
                invoiceDate: {
                    type: DataTypes.DATE,
                },
                invoiceValue: {
                    type: DataTypes.NUMBER,
                },
                idClient: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: true
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                sequelize: sequelize,
                tableName: 'invoice'
            });
    }

    public static associate(models: { [key: string]: ModelStatic<Model>; }) {
        this.belongsTo(models.Client, {
            as: 'client',
            foreignKey: 'idClient'
        });

        this.hasMany(models.InvoiceItem, {
            as: 'items',
            foreignKey: 'idInvoice'
        });
    }
}

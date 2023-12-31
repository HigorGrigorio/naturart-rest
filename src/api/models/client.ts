import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    ModelStatic,
    NonAttribute,
    Sequelize
} from "sequelize";
import {Address} from "./address";
import bcrypt from 'bcrypt';

export class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
    /**
     * Identifier in database.
     */
    declare id: CreationOptional<number>;

    /**
     * Name of client.
     */
    declare name: string;

    /**
     * Cpf of client.
     */
    declare cpf: string;

    /**
     * Birthdate of client.
     */
    declare birthDate: Date;

    /**
     * Email of client.
     */
    declare email: string;

    /**
     * Password of client.
     */
    declare password: string;

    /**
     * Telephone of client.
     */
    declare telephone: string;

    /**
     * Identifier of the address.
     */
    declare idAddress: ForeignKey<Address['id']>;

    /**
     * Date of creation.
     */
    declare createdAt: CreationOptional<Date>;

    /**
     * Date of last update.
     */
    declare updatedAt: CreationOptional<Date>;

    /**
     * Address of client.
     */
    declare address?: NonAttribute<Address>;

    /**
     * Initialize a model into connection
     * @param sequelize Sequelize instance.
     */
    public static initialize(sequelize: Sequelize): void {
        this.init({
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING(255),
                    allowNull: false
                },
                cpf: {
                    type: DataTypes.STRING(11),
                    allowNull: false
                },
                birthDate: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                telephone: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                sequelize: sequelize,
                tableName: 'client',
            });
    }

    public static hashPassword(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    passwordMatch(password: string): boolean {
        const hash = this.getDataValue('password');

        if (!password || !hash) return false;
        if (password === hash) return true;

        return bcrypt.compareSync(password, hash);
    }

    public static associate(models: { [key: string]: ModelStatic<Model>; }) {
        this.belongsTo(models.Address, {
            as: 'address',
            foreignKey: 'idAddress'
        })

        this.hasMany(models.Invoice, {
            as: 'invoices',
            foreignKey: 'idClient'
        })
    }
}

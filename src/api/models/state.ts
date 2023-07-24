import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ModelStatic,
    NonAttribute,
    Sequelize
} from "sequelize";
import {City} from "./city";

export class State extends Model<InferAttributes<State, { omit: 'cities' }>, InferCreationAttributes<State, { omit: 'cities' }>> {
    /**
     * Identifier of state.
     */
    declare id: CreationOptional<number>;

    /**
     * Name of state.
     */
    declare name: string;

    /**
     * Initials of state.
     */
    declare initials: CreationOptional<string>

    /**
     * Date of creation.
     */
    declare createdAt: CreationOptional<Date>;

    /**
     * Date of last update.
     */
    declare updatedAt: CreationOptional<Date>;

    /**
     * Cities of the state.
     */
    declare cities?: NonAttribute<City[]>;

    /**
     * Initialize a model into connection.
     *
     * @param sequelize Sequelize instance.
     */
    public static initialize(sequelize: Sequelize): void {
        this.init({
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },
                initials: {
                    type: new DataTypes.STRING(255),
                    allowNull: false,
                },
                name: {
                    type: new DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {sequelize: sequelize, tableName: 'state'});
    }

    /**
     * Create a database association to models instance.
     *
     * @param models Models of Sequelize instance.
     */
    public static associate(models: { [key: string]: ModelStatic<Model>; }) {
        this.hasMany(models.City, {
            as: 'cities',
            foreignKey: 'idState'
        });
    }
}

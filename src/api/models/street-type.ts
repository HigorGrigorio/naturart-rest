import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model, ModelStatic,
    Sequelize
} from "sequelize";
import {State} from "./state";

export class StreetType extends Model<InferAttributes<StreetType>, InferCreationAttributes<StreetType>> {
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
                    unique: true,
                },
                name: {
                    type: new DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {sequelize: sequelize});
    }

    /**
     * Create a database association to models instance.
     *
     * @param models Models of Sequelize instance.
     */
    public static associate(models: { [key: string]: ModelStatic<Model>; }) {
        this.hasMany(models.StreetCity, {
            as: 'streetCities',
            foreignKey: 'idStreetType'
        });
    }
}
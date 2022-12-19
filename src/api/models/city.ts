import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    Association, ModelStatic
} from "sequelize";
import {Sequelize} from "sequelize";
import {State} from "./state";
import {District} from "./district";
import {StreetCity} from "./street-city";
import {Address} from "./address";

export class City extends Model<InferAttributes<City>, InferCreationAttributes<City>> {
    /**
     * Identifier of city
     */
    declare id: CreationOptional<number>;

    /**
     * Name of city
     */
    declare name: string;

    /**
     * Date of creation.
     */
    declare createdAt: CreationOptional<Date>;

    /**
     * Date of last update.
     */
    declare updatedAt: CreationOptional<Date>;

    /**
     * Identifier of the state.
     */
    declare idState: ForeignKey<State['id']>;

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
                    allowNull: false,
                    unique: true
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {sequelize: sequelize});
    }

    public static associations: {
        state: Association<City, State>,
        district: Association<City, District>
        streetCity: Association<City, StreetCity>
    }

    /**
     * Create a database association to models instance.
     *
     * @param models Models of Sequelize instance.
     */
    public static associate(models: { [key: string]: ModelStatic<Model>; }) {
        this.belongsTo(models.State, {
            foreignKey: 'idState',
            as: 'state',
        })

        this.belongsToMany(models.District, {
            through: 'DistrictCity',
            foreignKey: 'idCity',
            as: 'districts'
        })

        this.hasMany(models.StreetCity, {
            as: 'streetsInfo',
            foreignKey: 'idCity'
        });

        this.hasMany(models.ZipCode, {
            as: 'zipCode',
            foreignKey: 'idCity'
        });
    }
}
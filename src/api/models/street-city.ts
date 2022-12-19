import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ModelStatic,
    ForeignKey, Association
} from "sequelize";
import {Sequelize} from "sequelize";
import {StreetType} from "./street-type";
import {City} from "./city";
import {Street} from "./street";

export class StreetCity extends Model<InferAttributes<StreetCity>, InferCreationAttributes<StreetCity>> {
    /**
     * Identifier of district.
     */
    declare id: CreationOptional<number>;

    /**
     * Date of creation.
     */
    declare createdAt: CreationOptional<Date>;

    /**
     * Date of last update.
     */
    declare updatedAt: CreationOptional<Date>;

    /**
     * Identifier of Street Type.
     */
    declare idStreetType: ForeignKey<StreetType['id']>;

    /**
     * Identifier of Street.
     */
    declare idCity: ForeignKey<City['id']>;

    /**
     * Identifier of City.
     */
    declare idStreet: ForeignKey<Street['id']>;

    public static associations: {
        street: Association<Street, StreetCity>,
        streetType: Association<StreetType, StreetCity>,
        city: Association<City, StreetCity>
    }

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
        this.belongsTo(models.Street, {
            as: 'street',
            foreignKey: 'idStreet'
        });

        this.belongsTo(models.StreetType, {
            as: 'streetType',
            foreignKey: 'idStreetType'
        });

        this.belongsTo(models.City, {
            as: 'city',
            foreignKey: 'idCity'
        });

        this.hasMany(models.ZipCode, {
            as: 'cep',
            foreignKey: 'idStreetCity'
        });

        this.hasMany(models.Address, {
            as: 'address',
            foreignKey: 'idStreetCity'
        });
    }
}
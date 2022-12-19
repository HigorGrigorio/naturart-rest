import {
    Association,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes, INTEGER,
    Model, ModelStatic, NonAttribute,
    Sequelize
} from "sequelize";
import {City} from "./city";
import {DistrictCity} from "./district-city";
import {StreetCity} from "./street-city";
import {District} from "./district";
import {State} from "./state";
import {Street} from "./street";
import {StreetType} from "./street-type";

export class ZipCode extends Model<InferAttributes<ZipCode>, InferCreationAttributes<ZipCode>> {
    /**
     * Identifier of zip code.
     */
    declare id: CreationOptional<number>;

    /**
     * code of zip code.
     */
    declare code: string;

    /**
     * Date of creation.
     */
    declare createdAt: CreationOptional<Date>;

    /**
     * Date of last update.
     */
    declare updatedAt: CreationOptional<Date>;

    /**
     * Identifier of city.
     */
    declare idCity?: ForeignKey<City['id']>;

    /**
     * Identifier of district city.
     */
    declare idDistrictCity?: ForeignKey<DistrictCity['id']>;

    /**
     * Identifier of street city.
     */
    declare idStreetCity?: ForeignKey<StreetCity['id']>;

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
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            idCity: {
                type: INTEGER.UNSIGNED,
                allowNull: false,
            },
            idDistrictCity: {
                type: INTEGER.UNSIGNED,
                allowNull: false,
            },
            idStreetCity: {
                type: INTEGER.UNSIGNED,
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {sequelize})
    }

    public static associations: {
        city: Association<ZipCode, City>,
        district: Association<ZipCode, District>,
        street: Association<ZipCode, Street>,
        streetCity: Association<ZipCode, StreetCity>
        state: Association<ZipCode, State>
    }

    /**
     * Create a database association to models instance.
     *
     * @param models Models of Sequelize instance.
     */
    public static associate(models: { [key: string]: ModelStatic<Model>; }) {
        this.belongsTo(models.City, {
            foreignKey: 'idCity',
            as: 'city'
        });

        this.belongsTo(models.DistrictCity, {
            foreignKey: 'idDistrictCity',
            as: 'districtCity'
        });

        this.belongsTo(models.StreetCity, {
            foreignKey: 'idStreetCity',
            as: 'streetInfo',
        });

        this.hasMany(models.Address, {
            foreignKey: 'idZipCode',
            as: 'address'
        });
    }
}
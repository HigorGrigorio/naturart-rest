import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    Association, ModelStatic, NonAttribute
} from "sequelize";

import {Sequelize} from "sequelize";
import {District} from "./district";
import {City} from "./city";

export class DistrictCity extends Model<InferAttributes<DistrictCity>, InferCreationAttributes<DistrictCity>> {
    /**
     * Identifier of city
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
     * Identifier of the district.
     */
    declare idDistrict: ForeignKey<District['id']>;

    /**
     * Identifier of the city.
     */
    declare idCity: ForeignKey<City['id']>;

    /**
     * The city represented by {@link idDistrict}. This field is omitted in the model.
     */
    declare district: NonAttribute<District>;

    /**
     * The city represented by {@link idCity}. This field is omitted in the model.
     */
    declare city: NonAttribute<City>;

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
        this.hasMany(models.ZipCode, {
            as: 'districtCities',
            foreignKey: 'idDistrictCity'
        });

        this.hasMany(models.Address, {
            as: 'address',
            foreignKey: 'idDistrictCity'
        });
    }
}
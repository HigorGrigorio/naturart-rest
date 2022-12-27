import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model, ModelStatic,
    Sequelize
} from "sequelize";
import {SensorType} from "./sensor-type";
import {Product} from "./product";

export class SensorTypeProduct extends Model<InferAttributes<SensorTypeProduct>, InferCreationAttributes<SensorTypeProduct>> {
    /**
     * Identifier in database.
     */
    declare id: CreationOptional<number>;

    /**
     * Identifier to sensor type relation.
     */
    declare idSensorType: ForeignKey<SensorType['id']>;

    /**
     * Identifier to product of purchase relation.
     */
    declare idProduct: ForeignKey<Product['id']>;

    /**
     * Date of creation.
     */
    declare createdAt: CreationOptional<Date>;

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
                idProduct: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                idSensorType: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {sequelize: sequelize});
    }

    public static associate(models: { [key: string]: ModelStatic<Model>; }) {
        this.hasMany(models.Measurement, {
            as: 'measures',
            foreignKey: 'idSensorTypeProduct'
        });
    }
}
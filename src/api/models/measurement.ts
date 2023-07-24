import {
    Association,
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    ModelStatic,
    Sequelize
} from "sequelize";
import {City} from "./city";
import {SensorTypeProduct} from "./sensor-type-product";

export class Measurement extends Model<InferAttributes<Measurement>, InferCreationAttributes<Measurement>> {
    /**
     * Identifier of model
     */
    declare id: CreationOptional<number>;

    /**
     * Date of measurement.
     */
    declare measurementDate: Date;

    /**
     * value of measurement.
     */
    declare value: number;

    /**
     * Identifier to relate the type of measurement to the product
     */
    declare idSensorTypeProduct: CreationOptional<number>;

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
            idSensorTypeProduct: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            value: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            measurementDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {sequelize, tableName: 'measurement'});
    }

    public static associate(models: { [key: string]: ModelStatic<Model>; }) {
        this.belongsTo(models.SensorTypeProduct, {
            as: 'measurementInfo',
            foreignKey: 'idSensorTypeProduct'
        });
    }
}

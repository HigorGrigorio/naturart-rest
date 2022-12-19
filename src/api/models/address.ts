import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model, ModelStatic,
    Sequelize
} from "sequelize";

export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
    /**
     * Identifier in database.
     */
    declare id: CreationOptional<number>;

    /**
     * Number of address.
     */
    declare number: number;

    /**
     * Complement of address.
     */
    declare complement: CreationOptional<string>;

    /**
     * Identifier of Street City
     */
    declare idStreetCity: number;

    /**
     * Identifier of Zip Code.
     */
    declare idZipCode: number;

    /**
     * Identifier of District City.
     */
    declare idDistrictCity: number;

    /**
     * Date of creation.
     */
    declare createdAt: CreationOptional<Date>;

    /**
     * Date of last update.
     */
    declare updatedAt: CreationOptional<Date>;

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
                number: {
                    type: DataTypes.INTEGER.UNSIGNED,
                },
                complement: {
                    type: DataTypes.STRING
                },
                idDistrictCity: {
                    type: DataTypes.INTEGER.UNSIGNED,
                },
                idStreetCity: {
                    type: DataTypes.INTEGER.UNSIGNED,
                },
                idZipCode: {
                    type: DataTypes.INTEGER.UNSIGNED,
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
        this.belongsTo(models.ZipCode, {
            as: 'cep',
            foreignKey: 'idZipCode'
        });

        this.belongsTo(models.StreetCity, {
            as: 'streetCity',
            foreignKey: 'idStreetCity'
        });
        
        this.belongsTo(models.DistrictCity, {
            as: 'districtCity',
            foreignKey: 'idDistrictCity'
        })
    }
}
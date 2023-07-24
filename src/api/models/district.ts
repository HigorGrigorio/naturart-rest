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

export class District extends Model<InferAttributes<District>, InferCreationAttributes<District>> {
    public static associations: {
        city: Association<District, City>
    }
    /**
     * Identifier of district.
     */
    declare id: CreationOptional<number>;
    /**
     * Name of district.
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
                    type: new DataTypes.STRING(128),
                    allowNull: false.valueOf(),
                    unique: true
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                sequelize: sequelize,
                tableName: 'district'});
            }

        /**
         * Create a database association to models instance.
         *
         * @param models Models of Sequelize instance.
         */
    public static
        associate(models
    :
        {
            [key
        :
            string
        ]:
            ModelStatic<Model>;
        }
    )
        {
            this.belongsToMany(models.City, {
                through: 'DistrictCity',
                foreignKey: 'idDistrict',
                as: 'districts'
            })
        }
    }

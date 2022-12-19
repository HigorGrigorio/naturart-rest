import {StreetCity} from "../models/street-city";
import {AbstractService} from "../abstract/abstract-service";
import {literal, Op} from "sequelize";
import NaturartResponse from "../utils/naturart-response";
import {City} from "../models/city";
import {StreetType} from "../models/street-type";
import {Street} from "../models/street";

export class StreetCityService extends AbstractService<StreetCity> {
    constructor() {
        super(StreetCity);
    }

    /**
     * Gets all streets in cities
     */
    async getAll(): Promise<NaturartResponse<StreetCity[]>> {
        const result = await StreetCity.findAll({
            attributes: ['id', 'updatedAt', 'createdAt'],
            include: [
                {
                    model: City,
                    as: 'city',
                },
                {
                    model: StreetType,
                    as: 'streetType',
                },
                {
                    model: Street,
                    as: 'street'
                }
            ]
        })

        return new NaturartResponse<StreetCity[]>({
            data: result,
            msg: 'Search performs successfully'
        })
    }

    /**
     *
     */
    async getById(id: number): Promise<NaturartResponse<StreetCity>> {
        const result = await StreetCity.findByPk(id, {
            attributes: ['id', 'updatedAt', 'createdAt'],
            include: [
                {
                    model: City,
                    as: 'city',
                },
                {
                    model: StreetType,
                    as: 'streetType',
                },
                {
                    model: Street,
                    as: 'street'
                }
            ]
        });

        if (!result) {
            return new NaturartResponse<StreetCity>({
                isError: true,
                msg: `Undefined street city with id '${id}'`
            })
        }

        return new NaturartResponse<StreetCity>({
            data: result,
            msg: 'Search performs successfully'
        })
    }

    /**
     * Gets a street with base in the name and the city id.
     *
     * @param name Name of the street.
     * @param idCity Id of the city.
     */
    async getByNameAndCityId(name: string, idCity: number): Promise<NaturartResponse<StreetCity>> {
        const result = await StreetCity.findOne({
            where: {
                idCity,
                idStreet: literal(`(
                    SELECT \`Street\`.\`id\`
                    FROM \`Street\` AS \`Street\`
                    WHERE upper(remove_accents(\`Street\`.\`name\`)) = upper(remove_accents(\'${name}\'))
                    LIMIT 1
                )`),
            },
            attributes: ['id', 'updatedAt', 'createdAt'],
            include: [
                {
                    model: City,
                    as: 'city',
                },
                {
                    model: StreetType,
                    as: 'streetType',
                },
                {
                    model: Street,
                    as: 'street'
                }
            ]
        });

        if (!result) {
            return new NaturartResponse<StreetCity>({
                isError: true,
                msg: `Undefined street ${name} in city with id ${idCity}`
            })
        }

        return new NaturartResponse<StreetCity>({
            data: result,
            msg: 'Search performs successfully'
        });
    }

    /**
     * Gets the quantity of the streets with base in the name and the city name.
     *
     @param name Name of the street.
     @param city Name of the city.
     */
    async getQttDistrictsInCity(name: string, city: string): Promise<NaturartResponse<number>> {
        const result = await StreetCity.count({
                where: {
                    idCity: {
                        [Op.eq]: literal(`(
                            SELECT \`City\`.\`id\`
                            FROM \`City\` AS \`City\`
                            WHERE upper(remove_accents(\`City\`.\`name\`)) = upper(remove_accents('${city}'))
                            LIMIT 1
                        )`)
                    },
                    idStreet: {
                        [Op.eq]: literal(`(
                            SELECT \`Street\`.\`id\`
                            FROM \`Street\` AS \`Street\`
                            WHERE upper(remove_accents(\`Street\`.\`name\`)) = upper(remove_accents('${name}'))
                            LIMIT 1
                        )`),
                    }
                }
            })
        ;

        return new NaturartResponse<number>({
            data: result,
            msg: 'Search performs successfully'
        });
    }

    /**
     * Check if the name of street is in use to city.
     *
     * @param name Name of the street.
     * @param idCity Id of the city.
     */
    async isNameInUse(name: string, idCity: number): Promise<NaturartResponse<boolean>> {
        const result = await StreetCity.findOne({
            where: {
                idCity,
                idStreet: literal(`(
                    SELECT \`Street\`.\`id\`
                    FROM \`Street\` AS \`Street\`
                    WHERE upper(remove_accents(\`Street\`.\`name\`)) = upper(remove_accents(\'${name}\'))
                    LIMIT 1
                )`),
            }
        }) != null;

        return new NaturartResponse<boolean>({
            data: result,
            msg: 'Search performs successfully'
        });
    }
}
import {AbstractService} from "../abstract/abstract-service";
import {DistrictCity} from "../models/district-city";
import {District} from "../models/district";
import {literal, Op, Sequelize} from "sequelize";
import {Utils} from "../utils/utils";
import NaturartResponse from "../utils/naturart-response";
import naturartResponse from "../utils/naturart-response";
import {AttributeExtractor} from "../utils/attribute-extractor";
import {QueryTypes} from "sequelize";
import {City} from "../models/city";

export class DistrictCityService extends AbstractService<DistrictCity> {
    /**
     * Construct a new instance of entity.
     */
    constructor() {
        super(DistrictCity);
    }

    /**
     * Get a city with base in the name of district and id of the city.
     *
     * @param name Name of the district.
     * @param idCity Id of the city
     */
    async getByNameAndCityId(name: string, idCity: number): Promise<NaturartResponse<District[]>> {
        const district =  await District.findOne({
            where: {
                name
            }
        });

        const idDistrict = district?.id;

        if(district == null || idDistrict === null){
            return new NaturartResponse<District[]>({
                msg: `Undefined district '${name}'.`,
                isError: true
            });
        }

        const quantity = await DistrictCity.count({
            where: {
                [Op.and]: {
                    idCity,
                    idDistrict
                }
            }
        })

        if (quantity === 0) {
            return new NaturartResponse<District[]>({
                msg: `Undefined district '${name}' in city with id '${idCity}'`,
                isError: true
            });
        }

        return new NaturartResponse<District[]>({
            msg: 'Search performs successfully',
            data: [district]
        });
    }

    /**
     * Get the quantity of districts with base in the name of districts and city name.
     *
     * @param name Name of the district.
     * @param city Id of the city
     */
    async getQttDistrictsByNameInCity(name: string, city: string): Promise<NaturartResponse<number>> {
        const result = await District.count({
            where: {
                [Op.and]: [
                    Utils.where('\`District\`.\`name\`', name),
                    {
                        id: {
                            [Op.eq]: literal(`(
                            SELECT \`DistrictCity\`.\`idDistrict\`
                            FROM 
                                \`DistrictCity\` AS \`DistrictCity\`,
                                \`City\` AS \`City\`
                            WHERE
                                \`DistrictCity\`.\`idCity\` = \`City\`.\`id\` AND
                                upper(remove_accents(\`City\`.\`name\`)) = upper(remove_accents('${city}'))
                            LIMIT 1 )`
                            )
                        }
                    }
                ]
            }
        });

        return new NaturartResponse<number>({
            msg: 'Search performs successfully',
            data: result
        });
    }

    /**
     * Get districts of city with base in the id.
     *
     * @param idCity
     */
    async getDistrictsByCityId(idCity: number): Promise<NaturartResponse<District[]>> {
        const [results, metadata] = await DistrictCity.sequelize?.query(
            `
                SELECT
                    \`District\`.\`id\`,
                    \`District\`.\`name\`,
                    \`District\`.\`updatedAt\`,
                    \`District\`.\`createdAt\`
                FROM 
                    \`District\` AS  \`District\`,
                    \`DistrictCity\` AS \`DistrictCity\`
                WHERE   
                     \`District\`.\`id\` = \`DistrictCity\`.\`idDistrict\`
                    AND \`DistrictCity\`.\`idCity\` = ${idCity};
            `
        ) ?? [[], 0];

        if (results.length == 0) {
            return new naturartResponse({
                isError: true,
                msg: `Undefined cities with id '${idCity}'`
            })
        }

        const districts: District[] = []

        Object.values(results).forEach(val => {
            const district: District = new District();
            district.setAttributes(AttributeExtractor.extract(val, {all: true}));
            districts.push(district);
        })

        return new NaturartResponse<District[]>({
            data: districts,
            msg: 'Search performs successfully'
        })
    }
}
import {City} from "../models/city";
import {col, Includeable, literal, Op} from "sequelize";
import {Utils} from "../utils/utils";
import {District} from "../models/district";
import {AbstractService} from "../abstract/abstract-service";
import NaturartResponse from "../utils/naturart-response";
import {State} from "../models/state";

export class CityService extends AbstractService<City> {
    /**
     * Construct a new instance of entity.
     */
    constructor() {
        super(City);
    }

    /**
     * Get a model with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<City[]>}  A array of model with base in the name.
     */
    async getByName(name: string): Promise<NaturartResponse<City[]>> {
        const result = await City.findAll({
            where: Utils.where('`City`.`name`', name),
            include: [
                {
                    model: District,
                    as: 'districts',
                    through:{attributes: []}
                },
                {
                    model: State,
                    as: 'state'
                }
            ]
        });

        return new NaturartResponse<City[]>({
            data: result,
            msg: 'Search performs successfully'
        })
    }

    /**
     * Get Quantity of models with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<NaturartResponse<>number>} The quantity of models with base in the name.
     */
    async getQttByName(name: string): Promise<NaturartResponse<number>> {
        const result = await City.count({
            where: Utils.where('`City`.`name`', name),
        });

        return new NaturartResponse<number>({
            data: result,
            msg: 'Search performs successfully'
        })
    }

    /**
     * Returns if model is in use with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<NaturartResponse<>boolean>} True if the name is in use, false otherwise.
     */
    async isNameInUse(name: string): Promise<NaturartResponse<boolean>> {
        const result = await City.findOne({
            where: Utils.where('`City`.`name`', name)
        }) != null;

        return new NaturartResponse<boolean>({
            data: result,
            msg: 'Search performs successfully'
        })
    }

    /**
     * Get the cities with in the state base in the name of city and the name of state.
     *
     * @param city Name of the city
     * @param state Name or initials of the state.
     */
    async getByNameAndState(city: string, state: string): Promise<NaturartResponse<City[]>> {
        const result = await City.findAll({
            where: {
                [Op.and]: [
                    Utils.where('`City`.`name`', city),
                    {
                        idState: {
                            [Op.eq]: literal(`(
                                SELECT id
                                FROM state
                                WHERE
                                    upper(remove_accents(` + '`State`.`name`' + `)) = upper(remove_accents('${state}')) OR
                                    upper(remove_accents(` + '`State`.`initials`' + `)) = upper(remove_accents('${state}')) 
                            )`)
                        }
                    }
                ]
            },
            order: col('name'),
            include: [
                {
                    model: District,
                    as: 'districts',
                    through: {attributes: []}
                },
                {
                    model: State,
                    as: 'state'
                },
            ]
        });

        if (result.length == 0) {
            return new NaturartResponse<City[]>({
                isError: true,
                msg: 'Undefined city `' + city + '` in state `' + state + '`'
            })
        }

        return new NaturartResponse<City[]>({
            data: result,
            msg: 'Search performs successfully'
        })
    }

    /**
     * Get the cities with in the state base in the name of city and the name of state.
     *
     * @param city Name of the city
     */
    async getDistrictsByCity(city: string): Promise<NaturartResponse<District[]>> {
        const result = await City.findAll({
            where: Utils.where('\`City\`.\`name\`', city),
            attributes: ['name'],
            include: {
                model: District,
                as: 'districts',
                through: {
                    attributes: []
                }
            }
        });

        return new NaturartResponse<District[]>({
            data: result,
            msg: 'Search performs successfully'
        })
    }

    /**
     * Get the quantity of cities with in the state base in the name of city and the name of state.
     *
     * @param city Name of the city
     * @param state Name or initials of the state.
     */
    async getQttByNameAndState(city: string, state: string): Promise<NaturartResponse<number>> {
        const result = await City.count({
                where: {
                    [Op.and]: [
                        Utils.where('`City`.`name`', city),
                        {
                            idState: {
                                [Op.eq]: literal(`(
                                SELECT id
                                FROM state
                                WHERE
                                    upper(remove_accents(` + '`State`.`name`' + `)) = upper(remove_accents('${state}')) OR
                                    upper(remove_accents(` + '`State`.`initials`' + `)) = upper(remove_accents('${state}')) 
                            )`)
                            }
                        }
                    ]
                }
            }
        );

        return new NaturartResponse<number>({
            data: result,
            msg: 'Search performs successfully'
        })
    }

    /**
     * Checks if the city exits in the state.
     *
     * @param city Name of the city.
     * @param state Name or initials of the state.
     */
    async isCityInState(city: string, state: string): Promise<NaturartResponse<boolean>> {
        const result = await City.findOne({
                where: {
                    [Op.and]: [
                        Utils.where('`City`.`name`', city),
                        {
                            idState: {
                                [Op.eq]: literal(`(
                                SELECT id
                                FROM state
                                WHERE
                                    upper(remove_accents(` + '`State`.`name`' + `)) = upper(remove_accents('${state}')) OR
                                    upper(remove_accents(` + '`State`.`initials`' + `)) = upper(remove_accents('${state}')) 
                            )`)
                            }
                        }
                    ]
                }
            }
        ) != null;

        return new NaturartResponse<boolean>({
            data: result,
            msg: 'Search performs successfully'
        });
    }

    /**
     * Finds a city with base in the id.
     *
     * @param id : number Id to find.
     * @returns {Promise<City>} A model with base in the id.
     */
    async getById(id: number): Promise<NaturartResponse<City>> {
        const result = await this.model.findByPk(id, {
            include: [
                {
                    model: District,
                    as: 'districts',
                    through: {attributes: []}
                },
                {
                    model: State,
                    as: 'state'
                },
            ]
        });

        if (!result) {
            return new NaturartResponse<City>({
                isError: true,
                msg: 'Undefined entity with id ' + id
            });
        }

        return new NaturartResponse<City>({
            data: result,
            msg: ''
        });
    }
}
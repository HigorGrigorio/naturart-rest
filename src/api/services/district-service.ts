import {District} from "../models/district";
import {NaturartResponse} from "../utils/naturart-response";
import {Utils} from "../utils/utils";
import {AbstractService} from "../abstract/abstract-service";

export class DistrictService extends AbstractService<District> {
    constructor() {
        super(District);
    }

    /**
     * Get a model with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<District[]>}  A array of model with base in the name.
     */
    async getByName(name: string): Promise<NaturartResponse<District[]>> {
        const result = await District.findAll({
            where: Utils.where('`District`.`name`', name),
        });

        return new NaturartResponse<District[]>({
            msg: 'Search performs successfully',
            data: result
        })
    }

    /**
     * Get Quantity of models with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<NaturartResponse<>number>} The quantity of models with base in the name.
     */
    async getQttByName(name: string): Promise<NaturartResponse<number>> {
        const result = await District.count({
            where: Utils.where('`District`.`name`', name),
        });

        return new NaturartResponse<number>({
            msg: 'Search performs successfully',
            data: result
        })
    }

    /**
     * Returns if model is in use with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<NaturartResponse<>boolean>} True if the name is in use, false otherwise.
     */
    async isNameInUse(name: string): Promise<NaturartResponse<boolean>> {
        const result = await District.findOne({
            where: Utils.where('`District`.`name`', name)
        }) != null;

        return new NaturartResponse<boolean>({
            msg: 'Search performs successfully',
            data: result
        })
    }
}
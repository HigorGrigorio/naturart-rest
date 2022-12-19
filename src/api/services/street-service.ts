import {AbstractService} from "../abstract/abstract-service";
import {Street} from "../models/street";
import {Utils} from "../utils/utils";
import NaturartResponse from "../utils/naturart-response";

export class StreetService extends AbstractService<Street> {
    constructor() {
        super(Street);
    }

    /**
     * Get a model with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<Street[]>}  A array of model with base in the name.
     */
    async getByName(name: string): Promise<NaturartResponse<Street[]>> {
        const result = await Street.findAll({
            where: Utils.where('`Street`.`name`', name)
        });

        return new NaturartResponse<Street[]>({
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
        const result = await Street.count({
            where: Utils.where('`Street`.`name`', name),
        });

        return new NaturartResponse<number>({
            data: result,
            msg: 'Search performs successfully'
        });
    }

    /**
     * Returns if model is in use with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<NaturartResponse<>boolean>} True if the name is in use, false otherwise.
     */
    async isNameInUse(name: string): Promise<NaturartResponse<boolean>> {
        const result = await Street.findOne({
            where: Utils.where('`Street`.`name`', name)
        }) != null;

        return new NaturartResponse<boolean>({
            data: result,
            msg: 'Search performs successfully'
        })
    }
}
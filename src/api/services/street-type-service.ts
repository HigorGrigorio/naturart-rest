import {StreetType} from "../models/street-type";
import {AbstractService} from "../abstract/abstract-service";
import NaturartResponse from "../utils/naturart-response";
import {Utils} from "../utils/utils";

export class StreetTypeService extends AbstractService<StreetType> {
    constructor() {
        super(StreetType);
    }

    /**
     * Get a model with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<StreetType[]>}  A array of model with base in the name.
     */
    async getByName(name: string): Promise<NaturartResponse<StreetType[]>> {
        const result = await StreetType.findAll({
            where: Utils.where('`StreetType`.`name`', name),
        });

        return new NaturartResponse<StreetType[]>({
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
        const result = await StreetType.count({
            where: Utils.where('`StreetType`.`name`', name),
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
        const result = await StreetType.findOne({
            where: Utils.where('`StreetType`.`name`', name)
        }) != null;

        return new NaturartResponse<boolean>({
            data: result,
            msg: 'Search performs successfully'
        })
    }

    /**
     * Get a model with base in the initials.
     *
     * @param initials : string Initials of model.
     * @returns {Promise<StreetType[]>}  A array of model with base in the initials.
     */
    async getByInitials(initials: string): Promise<NaturartResponse<StreetType[]>> {
        const result = await StreetType.findAll({
            where: Utils.where('`StreetType`.`initials`', initials),
        });

        if (!result) {
            return new NaturartResponse<StreetType[]>({
                isError: true,
                msg: `Undefined street type with initials '${initials}'`
            })
        }
        return new NaturartResponse({
            msg: 'Search performs successfully',
            data: result,
        });
    }

    /**
     * Get Quantity of models with base in the initials.
     *
     * @param initials : string Initials of model.
     * @returns {Promise<number>} The quantity of models with base in the initials.
     */
    async getQttByInitials(initials: string): Promise<NaturartResponse<number>> {
        const result = await StreetType.count({
            where: Utils.where('`StreetType`.`initials`', initials),
        });

        return new NaturartResponse({
            msg: 'Search performs successfully',
            data: result,
        });
    }

    /**
     * Returns if model is in use with base in the initials.
     *
     * @param initials : string Initials of model.
     * @returns {Promise<boolean>} True if the initials is in use, false otherwise.
     */
    async isInitialsInUse(initials: string): Promise<NaturartResponse<boolean>> {
        const result = await StreetType.findOne({
            where: Utils.where('`StreetType`.`initials`', initials)
        }) != null;

        return new NaturartResponse({
            msg: 'Search performs successfully',
            data: result,
        });
    }
}
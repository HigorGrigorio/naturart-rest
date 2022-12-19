import {State} from "../models/state";
import {AbstractService} from "../abstract/abstract-service";
import {Utils} from "../utils/utils";
import NaturartResponse from "../utils/naturart-response";
import {City} from "../models/city";

export class StateService extends AbstractService<State> {
    constructor() {
        super(State);
    }

    /**
     * Get a model with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<State[]>}  A array of model with base in the name.
     */
    async getByName(name: string): Promise<NaturartResponse<State[]>> {
        const result = await State.findAll({
            where: Utils.where('`State`.`name`', name),
            include: Object.values(State.associations),
        });

        return new NaturartResponse<State[]>({
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
        const result = await State.count({
            where: Utils.where('`State`.`name`', name),
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
        const result = await State.findOne({
            where: Utils.where('`State`.`name`', name)
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
     * @returns {Promise<State[]>}  A array of model with base in the initials.
     */
    async getByInitials(initials: string): Promise<NaturartResponse<State[]>> {
        const result = await State.findAll({
            where: Utils.where('`State`.`initials`', initials),
            include: Object.values(State.associations),
        });

        if (!result) {
            return new NaturartResponse<State[]>({
                isError: true,
                msg: `Undefined state with initials '${initials}'`
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
        const result = await State.count({
            where: Utils.where('`State`.`initials`', initials),
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
        const result = await State.findOne({
            where: Utils.where('`State`.`initials`', initials)
        }) != null;

        return new NaturartResponse({
            msg: 'Search performs successfully',
            data: result,
        });
    }

    /**
     * Returns a state and your cities with base in the id.
     *
     * @param id : number Id to find.
     * @returns {Promise<State | null>} A model with base in the id.
     */
    async getById(id: number): Promise<NaturartResponse<State>> {
        const result = await this.model.findByPk(id, {
            include: {
                as: 'cities',
                model: City
            }
        });

        if (!result) {
            return new NaturartResponse<State>({
                isError: true,
                msg: 'Undefined entity with id ' + id
            });
        }

        return new NaturartResponse<State>({
            data: result,
            msg: ''
        });
    }
}
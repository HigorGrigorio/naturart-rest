import {SensorType} from "../models/sensor-type";
import {AbstractService} from "../abstract/abstract-service";
import NaturartResponse from "../utils/naturart-response";
import {Utils} from "../utils/utils";

export class SensorTypeService extends AbstractService<SensorType> {
    constructor() {
        super(SensorType);
    }

    /**
     * Get a model with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<SensorType[]>}  A array of model with base in the name.
     */
    async getByName(name: string): Promise<NaturartResponse<SensorType[]>> {
        const result = await SensorType.findAll({
            where: Utils.where('`SensorType`.`name`', name),
        });

        return new NaturartResponse<SensorType[]>({
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
        const result = await SensorType.count({
            where: Utils.where('`SensorType`.`name`', name),
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
        const result = await SensorType.findOne({
            where: Utils.where('`SensorType`.`name`', name)
        }) != null;

        return new NaturartResponse<boolean>({
            data: result,
            msg: 'Search performs successfully'
        })
    }
}
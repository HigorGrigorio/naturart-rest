import {AbstractService} from "../abstract/abstract-service";
import {Localization} from "../models/localization";
import {literal, Op, Sequelize} from "sequelize";
import {Utils} from "../utils/utils";
import NaturartResponse from "../utils/naturart-response";
import {AttributeExtractor} from "../utils/attribute-extractor";
import {QueryTypes} from "sequelize";
import {City} from "../models/city";

export class LocalizationService extends AbstractService<Localization> {
    /**
     * Construct a new instance of entity.
     */
    constructor() {
        super(Localization);
    }

    /**
     * Get a city with base in the name of district and id of the city.
     *
     * @param name Name of the district.
     * @param idCity Id of the city
     */
    async getCurrentLocationByProductId(name: string, idCity: string): Promise<NaturartResponse<Localization>> {
        //TODO
        return new NaturartResponse<Localization>({
            msg: 'Unimplemented',
        });
    }

    /**
     * Get the quantity of districts with base in the name of districts and city name.
     *
     * @param name Name of the district.
     * @param city Id of the city
     */
    async getQttByProductId(name: string, city: string): Promise<NaturartResponse<number>> {
        //TODO
        return new NaturartResponse<number>({
            msg: 'Unimplemented',
        });
    }

    /**
     * Get districts of city with base in the id.
     *
     * @param idCity
     */
    async getAllByProductId(idCity: number): Promise<NaturartResponse<Localization[]>> {
        //TODO
        return new NaturartResponse<Localization[]>({
            msg: 'Unimplemented',
        });
    }
}
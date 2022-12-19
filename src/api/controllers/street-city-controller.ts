import {AbstractController} from "../abstract/abstract-controller";
import {StreetCity} from "../models/street-city";
import {StreetCityService} from "../services/street-city-service";
import {Request, Response} from "express";
import {Utils} from "../utils/utils";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";

export class StreetCityController extends AbstractController<StreetCity> {
    protected readonly service: StreetCityService

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: StreetCityService) {
        super(service);
        this.service = service;
    }


    /**
     * Default factory method.
     */
    static default() {
        return new StreetCityController(new StreetCityService());
    }

    /**
     * Get the street with in the id of City and the name of street.
     *
     * @param req The request.
     * @param res The response.
     */
    async getByNameAndCityId(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const {name, idCity} = AttributeExtractor.extract(req.query, {
                attributes: {
                    name: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    idCity: {
                        isRequired: true,
                        notEmpty: true
                    }
                }
            });

            const response = await this.service.getByNameAndCityId(name, Utils.normalizeKey(idCity));

            return res.json(response);
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    /**
     * Get the quantity of streets with in the name of City and the name of street.
     *
     * @param req The request.
     * @param res The response.
     */
    async getQttDistrictsInCity(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const {name, city} = AttributeExtractor.extract(req.query, {
                attributes: {
                    name: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    city: {
                        isRequired: true,
                        notEmpty: true
                    }
                }
            })

            const response = await this.service.getQttDistrictsInCity(name, city);
            return res.json({response});
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }


    /**
     * Get the street with in the id of City and the name of street.
     *
     * @param req The request.
     * @param res The response.
     */
    async isNameInUse(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const {name, idCity} = AttributeExtractor.extract(req.query, {
                attributes: {
                    name: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    idCity: {
                        isRequired: true,
                        notEmpty: true
                    }
                }
            })

            const response = await this.service.isNameInUse(name, Utils.normalizeKey(idCity));

            return res.json(response);
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }
}
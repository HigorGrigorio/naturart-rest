import {DistrictCity} from "../models/district-city";
import {DistrictCityService} from "../services/district-city-service";
import {AbstractController} from "../abstract/abstract-controller";
import {Request, Response} from "express";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";
import {Utils} from "../utils/utils";

export class DistrictCityController extends AbstractController<DistrictCity> {
    protected readonly service: DistrictCityService;

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: DistrictCityService) {
        super(service);
        this.service = service;
    }

    /**
     * Default factory method.
     */
    static default() {
        return new DistrictCityController(new DistrictCityService());
    }

    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    async getByNameAndCityId(req: Request, res: Response): Promise<Response> {
        try {
            const {name, idCity} = AttributeExtractor.extract(req.query, {
                attributes: {
                    name: {
                        isRequired: true,
                        notEmpty: true
                    },
                    idCity: {
                        isRequired: true,
                        notEmpty: true
                    }
                }
            });
            return res.json(await this.service.getByNameAndCityId(name, Utils.normalizeKey(idCity)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<undefined>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    async getQttDistrictsByNameInCity(req: Request, res: Response): Promise<Response> {
        try {
            const {name, city} = AttributeExtractor.extract(req.query, {
                attributes: {
                    name: {
                        isRequired: true,
                        notEmpty: true
                    },
                    city: {
                        isRequired: true,
                        notEmpty: true
                    }
                }
            });
            return res.json(await this.service.getQttDistrictsByNameInCity(name, city));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<undefined>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    async getDistrictsByCityId(req: Request, res: Response): Promise<Response> {
        try {
            const {idCity} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idCity: {
                        isRequired: true,
                        notEmpty: true
                    },
                }
            });
            return res.json(await this.service.getDistrictsByCityId(Utils.normalizeKey(idCity)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<undefined>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }
}
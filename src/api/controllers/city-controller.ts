import {City} from "../models/city";
import {CityService} from "../services/city-service";
import {AbstractController} from "../abstract/abstract-controller";
import {Request, Response} from "express";
import {AttributeExtractor} from "../utils/attribute-extractor";
import {NaturartResponse} from "../utils/naturart-response";

export class CityController extends AbstractController<City> {
    protected readonly service: CityService

    /**
     * Default factory method.
     */
    static default() {
        return new CityController(new CityService());
    }

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: CityService) {
        super(service);
        this.service = service;
    }

    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    async getByName(req: Request, res: Response): Promise<Response> {
        try {
            const {name} = AttributeExtractor.extract(req.query, {
                attributes: {
                    name: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getByName(name));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
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
    async getQttByName(req: Request, res: Response): Promise<Response> {
        try {
            const {name} = AttributeExtractor.extract(req.query, {
                attributes: {
                    name: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getQttByName(name));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
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
    async isNameInUse(req: Request, res: Response): Promise<Response> {
        try {
            const {name} = AttributeExtractor.extract(req.query, {
                attributes: {
                    name: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.isNameInUse(name));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    /**
     * Get the cities with in the state base in the name of city and the name of state.
     *
     * @param req The request.
     * @param res The response.
     */
    async getByNameAndState(req: Request, res: Response): Promise<Response> {
        try {
            const {city, state} = AttributeExtractor.extract(req.query, {
                attributes: {
                    city: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    state: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getByNameAndState(city, state));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }


    /**
     * Get the cities with in the state base in the name of city and the name of state.
     *
     * @param req The request.
     * @param res The response.
     */
    async getDistrictsByCity(req: Request, res: Response): Promise<Response> {
        try {
            const {city}: any = AttributeExtractor.extract(req.query, {
                attributes: {
                    city: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getDistrictsByCity(city));
        } catch
            (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    /**
     * Get the quantity of cities with in the state base in the name of city and the name of state.
     *
     * @param req The request.
     * @param res The response.
     */
    async getQttByNameAndState(req: Request, res: Response): Promise<Response> {
        try {
            const {city, state} = AttributeExtractor.extract(req.query, {
                attributes: {
                    city: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    state: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getQttByNameAndState(city, state));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<undefined>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }


    /**
     * Checks if the city exits in the state.
     *
     * @param req The request.
     * @param res The response.
     */
    async isCityInState(req: Request, res: Response): Promise<Response> {
        try {
            const {city, state} = AttributeExtractor.extract(req.query, {
                attributes: {
                    city: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.isCityInState(city, state));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<undefined>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }
}
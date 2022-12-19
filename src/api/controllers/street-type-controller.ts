import {StreetType} from "../models/street-type";
import {StreetTypeService} from "../services/street-type-service";
import {AbstractController} from "../abstract/abstract-controller";
import {Request, Response} from "express";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";
import {City} from "../models/city";

export class StreetTypeController extends AbstractController<StreetType> {
    protected readonly service: StreetTypeService;

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: StreetTypeService) {
        super(service);
        this.service = service;
    }

    /**
     * Default factory method.
     */
    static default() {
        return new StreetTypeController(new StreetTypeService());
    }

    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    async getByName(req: Request, res: Response): Promise<Response<City[], Record<string, City[]>> | undefined> {
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
    async getQttByName(req: Request, res: Response): Promise<Response<number, Record<string, number>> | undefined> {
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
    async isNameInUse(req: Request, res: Response): Promise<Response<boolean, Record<string, boolean>> | undefined> {
        try {
            const {name} = AttributeExtractor.extract(req.query, {
                attributes: {
                    name: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            })
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
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    async getByInitials(req: Request, res: Response): Promise<Response<StreetType[], Record<string, StreetType[]>> | undefined> {
        try {
            const {initials} = AttributeExtractor.extract(req.query, {
                attributes: {
                    initials: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getByInitials(initials));
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
    async getQttByInitials(req: Request, res: Response): Promise<Response<number, Record<string, number>> | undefined> {
        try {
            const {initials} = AttributeExtractor.extract(req.query, {
                attributes: {
                    initials: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getQttByInitials(initials));
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
    async isInitialsInUse(req: Request, res: Response): Promise<Response<boolean, Record<string, boolean>> | undefined> {
        try {
            const {initials} = AttributeExtractor.extract(req.query, {
                attributes: {
                    initials: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.isInitialsInUse(initials));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }
}
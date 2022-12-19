import {SensorType} from "../models/sensor-type";
import {SensorTypeService} from "../services/sensor-type-service";
import {AbstractController} from "../abstract/abstract-controller";
import {Request, Response} from "express";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";

export class SensorTypeController extends AbstractController<SensorType> {
    protected readonly service: SensorTypeService;

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: SensorTypeService) {
        super(service);
        this.service = service;
    }

    /**
     * Default factory method.
     */
    static default() {
        return new SensorTypeController(new SensorTypeService());
    }

    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    async getByName(req: Request, res: Response): Promise<Response<SensorType[], Record<string, SensorType[]>> | undefined> {
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
}
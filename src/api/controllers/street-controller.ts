import {Street} from "../models/street";
import {StreetService} from "../services/street-service";
import {AbstractController} from "../abstract/abstract-controller";
import {Request, Response} from "express";
import {City} from "../models/city";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";

export class StreetController extends AbstractController<Street> {
    protected readonly service: StreetService;

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: StreetService) {
        super(service);
        this.service = service;
    }

    /**
     * Default factory method.
     */
    static default() {
        return new StreetController(new StreetService());
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
                })
            );
        }
    }
}
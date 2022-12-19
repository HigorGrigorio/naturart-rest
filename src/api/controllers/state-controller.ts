import {State} from "../models/state";
import {StateService} from "../services/state-service";
import {AbstractController} from "../abstract/abstract-controller";
import {Request, Response} from "express";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";

export class StateController extends AbstractController<State> {
    protected readonly service: StateService;

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: StateService) {
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
     * Default factory method.
     */
    static default() {
        return new StateController(new StateService());
    }

    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    async getByInitials(req: Request, res: Response): Promise<Response<State[], Record<string, State[]>> | undefined> {
        try {
            const {initials} = AttributeExtractor.extract(req.query, {
                attributes: {
                    initials: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            })
            return res.json(await this.service.getByInitials(initials));
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
                new NaturartResponse<undefined>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

}
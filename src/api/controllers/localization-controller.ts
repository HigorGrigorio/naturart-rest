import {AbstractController} from "../abstract/abstract-controller";
import Localization from "../models/localization";
import {LocalizationService} from "../services/localization-service";
import {Request, Response} from "express";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";
import {Utils} from "../utils/utils";

export class LocalizationController extends AbstractController<Localization> {
    protected readonly service: LocalizationService;

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: LocalizationService) {
        super(service);
        this.service = service;
    }

    /**
     * Default factory method.
     */
    static default() {
        return new LocalizationController(new LocalizationService());
    }

    async getCurrentLocationByProductId(req: Request, res: Response): Promise<Response> {
        try {
            const {idProduct} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idProduct: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getCurrentLocationByProductId(Utils.normalizeKey(idProduct)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getQttByProductId(req: Request, res: Response): Promise<Response> {
        try {
            const {idProduct} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idProduct: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getQttByProductId(Utils.normalizeKey(idProduct)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getAllByProductId(req: Request, res: Response): Promise<Response> {
        try {
            const {idProduct} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idProduct: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getAllByProductId(Utils.normalizeKey(idProduct)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getAllByProductIdAndInterval(req: Request, res: Response): Promise<Response> {
        try {
            const {idProduct, startInterval, endInterval} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idProduct: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    startInterval: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    endInterval: {
                        isRequired: false,
                        notEmpty: false,
                    },
                }
            });
            return res.json(await this.service.getAllByProductIdAndInterval(Utils.normalizeKey(idProduct), startInterval, endInterval));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }
}
import {AbstractController} from "../abstract/abstract-controller";
import {InvoiceItem} from "../models/invoice-item";
import {InvoiceItemService} from "../services/invoice-item-service";
import {Request, Response} from "express";
import {AttributeExtractor} from "../utils/attribute-extractor";
import {Utils} from "../utils/utils";
import NaturartResponse from "../utils/naturart-response";

export class InvoiceItemController extends AbstractController<InvoiceItem> {
    protected readonly service: InvoiceItemService;

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: InvoiceItemService) {
        super(service);
        this.service = service;
    }

    /**
     * Default factory method.
     */
    static default() {
        return new InvoiceItemController(new InvoiceItemService());
    }

    async getCurrentLocalizationByProductId(req: Request, res: Response): Promise<Response> {
        try {
            const {idProduct} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idProduct: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getCurrentLocalizationByProductId(Utils.normalizeKey(idProduct)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }
    async getLocationsByProductId(req: Request, res: Response): Promise<Response> {
        try {
            const {idProduct} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idProduct: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getLocationsByProductId(Utils.normalizeKey(idProduct)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }
    async getQttLocationsByProductId(req: Request, res: Response): Promise<Response> {
        try {
            const {idProduct} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idProduct: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getQttLocationsByProductId(Utils.normalizeKey(idProduct)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }
}
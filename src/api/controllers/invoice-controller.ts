import {AbstractController} from "../abstract/abstract-controller";
import {Invoice} from "../models/invoice";
import {DistrictService} from "../services/district-service";
import {InvoiceService} from "../services/invoice-service";
import {Request, Response} from "express";
import {City} from "../models/city";
import NaturartResponse from "../utils/naturart-response";
import {AttributeExtractor} from "../utils/attribute-extractor";
import {Utils} from "../utils/utils";

export class InvoiceController extends AbstractController<Invoice> {
    protected readonly service: InvoiceService;

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: InvoiceService) {
        super(service);
        this.service = service;
    }

    /**
     * Default factory method.
     */
    static default() {
        return new InvoiceController(new InvoiceService());
    }

    async getByInvoiceNumber(req: Request, res: Response): Promise<any> {
        try {
            const {invoiceNumber} = AttributeExtractor.extract(req.query, {
                attributes: {
                    invoiceNumber: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });

            const result = await this.service.getByInvoiceNumber(Utils.normalizeKey(invoiceNumber));
            return res.json(result);
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                })
            );
        }
    }

    async getByClientId(req: Request, res: Response): Promise<any> {
        try {
            const {idClient} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idClient: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            const result = await this.service.getByClientId(Utils.normalizeKey(idClient));
            return res.json(result);
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                })
            );
        }
    }

    async getQttByClientId(req: Request, res: Response): Promise<any> {
        try {
            const {idClient} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idClient: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            const result = await this.service.getQttByClientId(Utils.normalizeKey(idClient));
            return res.json(result);
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                })
            );
        }
    }

    async isInvoiceNumberInUse(req: Request, res: Response): Promise<any> {
        try {
            const {invoiceNumber} = AttributeExtractor.extract(req.query, {
                attributes: {
                    invoiceNumber: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            const result = await this.service.isInvoiceNumberInUse(Utils.normalizeKey(invoiceNumber));
            return res.json(result);
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

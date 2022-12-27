import {AbstractController} from "../abstract/abstract-controller";
import {Product} from "../models/product";
import {ProductService} from "../services/product-service";
import {Request, Response} from "express";
import {SensorType} from "../models/sensor-type";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";
import {Utils} from "../utils/utils";

export class ProductController extends AbstractController<Product> {
    protected readonly service: ProductService;

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: ProductService) {
        super(service);
        this.service = service;
    }

    /**
     * Default factory method.
     */
    static default() {
        return new ProductController(new ProductService());
    }

    async add(req: Request, res: Response): Promise<any> {
        try {
            const {serialCode, name} = AttributeExtractor.extract(req.query, {
                attributes: {
                    serialCode: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    name: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            })
            const result = await this.service.add({serialCode, name});
            return res.json(result);
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async update(req: Request, res: Response): Promise<any> {
        try {
            const {id, serialCode, name} = AttributeExtractor.extract(req.query, {
                attributes: {
                    id: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    serialCode: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    name: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            })
            const result = await this.service.update({id}, {serialCode, name});
            return res.json(result);
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getBySerialCode(req: Request, res: Response): Promise<any> {
        try {
            const {serialCode} = AttributeExtractor.extract(req.query, {
                attributes: {
                    serialCode: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getBySerialCode(serialCode));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getByName(req: Request, res: Response): Promise<any> {
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

    async getQttBySensorTypeId(req: Request, res: Response): Promise<any> {
        try {
            const {idSensorType} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idSensorType: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getQttBySensorTypeId(Utils.normalizeKey(idSensorType)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getTypeByProductId(req: Request, res: Response): Promise<any> {
        try {
            const {idProduct} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idProduct: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getTypeByProductId(Utils.normalizeKey(idProduct)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async isSerialCodeInUse(req: Request, res: Response): Promise<any> {
        try {
            const {serialCode} = AttributeExtractor.extract(req.query, {
                attributes: {
                    serialCode: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.isSerialCodeInUse(serialCode));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async isNameInUse(req: Request, res: Response): Promise<any> {
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
}
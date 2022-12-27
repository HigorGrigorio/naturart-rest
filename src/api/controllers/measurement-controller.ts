import {AbstractController} from "../abstract/abstract-controller";
import {Measurement} from "../models/measurement";
import {MeasurementService} from "../services/measurement-service";
import {Request, Response} from "express";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";
import {Utils} from "../utils/utils";

export class MeasurementController extends AbstractController<Measurement> {
    protected readonly service: MeasurementService

    /**
     * Default factory method.
     */
    static default() {
        return new MeasurementController(new MeasurementService());
    }

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: MeasurementService) {
        super(service);
        this.service = service;
    }

    async getByProductId(req: Request, res: Response): Promise<any> {
        try {
            const {idProduct} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idProduct: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getByProductId(Utils.normalizeKey(idProduct)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getByProductIdAndInterval(req: Request, res: Response): Promise<any> {
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
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getByProductIdAndInterval(Utils.normalizeKey(idProduct), startInterval, endInterval));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getByProductAndType(req: Request, res: Response): Promise<any> {
        try {
            const {idProduct, idSensorType} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idProduct: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    idSensorType: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getByProductAndType(Utils.normalizeKey(idProduct), Utils.normalizeKey(idSensorType)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getByProductIdAndTypeAndInterval(req: Request, res: Response): Promise<any> {
        try {
            const {idProduct, idSensorType, startInterval, endInterval} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idProduct: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    idSensorType: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    startInterval: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    endInterval: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getByProductIdAndTypeAndInterval(Utils.normalizeKey(idProduct), Utils.normalizeKey(idSensorType), startInterval, endInterval));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getProductByMeasurementId(req: Request, res: Response): Promise<any> {
        try {
            const {idMeasurement} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idMeasurement: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getProductByMeasurementId(Utils.normalizeKey(idMeasurement)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }
}
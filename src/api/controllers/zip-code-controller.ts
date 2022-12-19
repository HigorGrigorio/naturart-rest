import {AbstractController} from "../abstract/abstract-controller";
import {ZipCode} from "../models/zip-code";
import {ZipCodeService} from "../services/zip-code-service";
import {StreetTypeService} from "../services/street-type-service";
import {Request, Response} from "express";
import {City} from "../models/city";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";

export class ZipCodeController extends AbstractController<ZipCode> {
    protected readonly service: ZipCodeService;

    constructor(service: ZipCodeService) {
        super(service);
        this.service = service
    }

    /*** Default factory method.
    */
    static default() {
        return new ZipCodeController(new ZipCodeService());
    }

    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    async getDistrictsByCepNumber(req: Request, res: Response): Promise<Response<City[], Record<string, City[]>> | undefined> {
        try {
            const {code} = AttributeExtractor.extract(req.query, {
                attributes: {
                    code: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getDistrictsByCepNumber(code));
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
    async getStreetsByCepNumber(req: Request, res: Response): Promise<Response<City[], Record<string, City[]>> | undefined> {
        try {
            const {code} = AttributeExtractor.extract(req.query, {
                attributes: {
                    code: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getStreetsByCepNumber(code));
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
    async getByNumber(req: Request, res: Response): Promise<Response<City[], Record<string, City[]>> | undefined> {
        try {
            const {code} = AttributeExtractor.extract(req.query, {
                attributes: {
                    code: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getByNumber(code));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }
}

export default ZipCodeController;
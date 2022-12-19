import {IController} from "../controllers/icontroller";
import {Request, Response} from "express";
import {Model} from "sequelize";
import {IService} from "../services/iservice";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";

export abstract class AbstractController<M extends Model> implements IController {
    /**
     * The instance of service.
     *
     * @private
     */
    protected readonly service!: IService<M>

    /**
     * Construct a new instance of controller.
     *
     * @param service IService<M>
     * @protected
     */
    protected constructor(service: IService<M>) {
        this.service = service;
    }

    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    async add(req: Request, res: Response): Promise<Response<M, Record<string, M>> | undefined> {
        try {
            let attributes: any = AttributeExtractor.extract(req.query, {
                all: true
            });

            const response = await this.service.add(attributes);

            return res.json(response);
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
    async deleteById(req: Request, res: Response): Promise<Response<number, Record<string, number>> | undefined> {
        try {
            let attributes: any = AttributeExtractor.extract(req.query, {
                attributes: {
                    id: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });

            const response = await this.service.deleteById(attributes);
            response.msg = 'Operation performs successfully';

            return res.json(response);
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
    async getAll(req: Request, res: Response): Promise<Response<M, Record<string, M>> | undefined> {
        try {
            const response = await this.service.getAll();
            response.msg = 'Operation performs successfully';

            return res.json(response);
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
    async getById(req: Request, res: Response): Promise<Response<M, Record<string, M>> | undefined> {
        try {
            let {id}: any = AttributeExtractor.extract(req.query, {
                attributes: {
                    id: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });

            const response = await this.service.getById(id);

            if (!response.isError) {
                response.msg = 'Operation performs successfully';
            } else {
                response.msg = 'Undefined entity with id';
            }

            return res.json(response);
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
    async update(req: Request, res: Response): Promise<Response<number, Record<string, number>> | undefined> {
        try {
            const attributes: any = AttributeExtractor.extract(req.query, {
                all: true,
                attributes: {
                    id: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            const {id} = attributes;
            const response = await this.service.update({id}, attributes);

            response.msg = 'Operation performs successfully';

            return res.json(response);
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }
}
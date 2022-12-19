import {AbstractController} from "../abstract/abstract-controller";
import {Client} from "../models/client";
import ClientService from "../services/client-service";
import {Request, Response} from "express";
import {AttributeExtractor} from "../utils/attribute-extractor";
import NaturartResponse from "../utils/naturart-response";
import {Utils} from "../utils/utils";

export class ClientController extends AbstractController<Client> {
    protected readonly service: ClientService;

    static default() {
        return new ClientController(new ClientService());
    }

    constructor(service: ClientService) {
        super(service);
        this.service = service;
    }

    async getByCpf(req: Request, res: Response): Promise<Response> {
        try {
            const {cpf} = AttributeExtractor.extract(req.query, {
                attributes: {
                    cpf: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getByCpf(cpf));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getByEmail(req: Request, res: Response): Promise<Response> {
        try {
            const {email} = AttributeExtractor.extract(req.query, {
                attributes: {
                    email: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getByEmail(email));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async getAddressesByClientId(req: Request, res: Response): Promise<Response> {
        try {
            const {idClient} = AttributeExtractor.extract(req.query, {
                attributes: {
                    idClient: {
                        isRequired: true,
                        notEmpty: true,
                    }
                }
            });
            return res.json(await this.service.getAddressesByClientId(Utils.normalizeKey(idClient)));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const {email, password} = AttributeExtractor.extract(req.query, {
                attributes: {
                    email: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    password: {
                        isRequired: true,
                        notEmpty: true
                    }
                }
            });
            return res.json(await this.service.login(email, password));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async rememberPassword(req: Request, res: Response): Promise<Response> {
        try {
            const {email, password, cpf} = AttributeExtractor.extract(req.query, {
                attributes: {
                    email: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    password: {
                        isRequired: true,
                        notEmpty: true
                    },
                    cpf: {
                        isRequired: true,
                        notEmpty: true
                    }
                }
            });
            return res.json(await this.service.rememberPassword(cpf, email, password));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async updatePassword(req: Request, res: Response): Promise<Response> {
        try {
            const {email, currentPassword, newPassword, confirmPassword} = AttributeExtractor.extract(req.query, {
                attributes: {
                    email: {
                        isRequired: true,
                        notEmpty: true,
                    },
                    currentPassword: {
                        isRequired: true,
                        notEmpty: true
                    },
                    newPassword: {
                        isRequired: true,
                        notEmpty: true
                    },
                    confirmPassword: {
                        isRequired: true,
                        notEmpty: true
                    }
                }
            });
            return res.json(await this.service.updatePassword(email, currentPassword, newPassword, confirmPassword));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async validateCpf(req: Request, res: Response): Promise<Response> {
        try {
            const {cpf} = AttributeExtractor.extract(req.query, {
                attributes: {
                    cpf: {
                        isRequired: true,
                        notEmpty: true
                    }
                }
            });
            return res.json(await this.service.validateCpf(cpf));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async isCpfInUse(req: Request, res: Response): Promise<Response> {
        try {
            const {cpf} = AttributeExtractor.extract(req.query, {
                attributes: {
                    cpf: {
                        isRequired: true,
                        notEmpty: true
                    }
                }
            });
            return res.json(await this.service.isCpfInUse(cpf));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }

    async isEmailInUse(req: Request, res: Response): Promise<Response> {
        try {
            const {email} = AttributeExtractor.extract(req.query, {
                attributes: {
                    email: {
                        isRequired: true,
                        notEmpty: true
                    }
                }
            });
            return res.json(await this.service.isEmailInUse(email));
        } catch (e: any) {
            return res.status(400).json(
                new NaturartResponse<boolean>({
                    msg: e.message ?? 'Inspected Error',
                    isError: true,
                }));
        }
    }


}

export default ClientController;
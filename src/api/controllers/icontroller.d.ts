import {Request, Response} from "express";

export interface IController {
    add(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;

    deleteById(req: Request, res: Response): Promisse<Response<any, Record<string, any>> | undefined>;

    getAll(req: Request, res: Response): Promisse<Response<any, Record<string, any>> | undefined>;

    getById(req: Request, res: Response): Promisse<Response<any, Record<string, any>> | undefined>;

    update(req: Request, res: Response): Promisse<Response<any, Record<string, any>> | undefined>;
}
import {Request, Response} from "express";
import {ControllerManager} from '../utils/controller-manager'
import {IController} from "../controllers/icontroller";

export class Dispatcher {
    public readonly manager: ControllerManager;

    constructor() {
        this.manager = new ControllerManager();
    }

    public async dispatch(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
        try {
            const controllerName = req.params.controller;
            const methodName = req.params.method;

            const ctrl = this.manager.get({key: controllerName});

            if (!ctrl) {
                return res.status(400).json({value: [`undefined 'control' with name ${controllerName}.`]})
            }

            if (!(methodName in ctrl)) {
                return res.status(400).json({value: [`undefined 'method' with name ${methodName}.`]})
            }

            const method = ctrl[methodName];

            return await method.call(ctrl, req, res);
        } catch (e: any) {
            return res.status(400).json({value: ['message' in e ? e.message : 'Inspected Error']});
        }
    }

    public register<TController extends IController>(key: string, controller: TController): Dispatcher {
        this.manager.attach(key, controller);
        return this;
    }

    public unregister(key: string): any {
        return this.manager.detach(key);
    }
}

export default Dispatcher;
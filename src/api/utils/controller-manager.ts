import {IController} from "../controllers/icontroller";

export type FindOptions = { against?: any } | { key: string }

export class ControllerManager {
    public readonly controllers: { [key: string]: any };

    constructor() {
        this.controllers = [];
    }

    attach<TController extends IController>(
        key: string,
        controller: TController
    ): ControllerManager {
        this.controllers[key] = controller;
        return this;
    }

    detach<TController extends IController>(
        key: string
    ): ControllerManager {
        const ctrl = this.get({key});
        if (ctrl) {
            delete this.controllers[key];
        }
        return ctrl;
    }

    get(options: FindOptions): any {
        if ('key' in options) {
            return this.controllers[options.key];
        }

        if ('against' in options) {
            return Object.values(this.controllers).forEach(ctrl => {
                if (ctrl === options.against) {
                    return ctrl;
                }
            })
        }

        return undefined;
    }
}

export default ControllerManager;
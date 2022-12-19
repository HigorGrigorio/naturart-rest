"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerManager = void 0;
class ControllerManager {
    constructor() {
        Object.defineProperty(this, "controllers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.controllers = [];
    }
    attach(key, controller) {
        this.controllers[key] = controller;
        return this;
    }
    detach(key) {
        const ctrl = this.get({ key });
        if (ctrl) {
            delete this.controllers[key];
        }
        return ctrl;
    }
    get(options) {
        if ('key' in options) {
            return this.controllers[options.key];
        }
        if ('against' in options) {
            return Object.values(this.controllers).forEach(ctrl => {
                if (ctrl === options.against) {
                    return ctrl;
                }
            });
        }
        return undefined;
    }
}
exports.ControllerManager = ControllerManager;
exports.default = ControllerManager;
//# sourceMappingURL=controller-manager.js.map
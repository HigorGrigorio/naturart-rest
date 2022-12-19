"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatcher = void 0;
const controller_manager_1 = require("../utils/controller-manager");
class Dispatcher {
    constructor() {
        Object.defineProperty(this, "manager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.manager = new controller_manager_1.ControllerManager();
    }
    dispatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const controllerName = req.params.controller;
                const methodName = req.params.method;
                const ctrl = this.manager.get({ key: controllerName });
                if (!ctrl) {
                    return res.status(400).json({ value: [`undefined 'control' with name ${controllerName}.`] });
                }
                if (!(methodName in ctrl)) {
                    return res.status(400).json({ value: [`undefined 'method' with name ${methodName}.`] });
                }
                const method = ctrl[methodName];
                return yield method.call(ctrl, req, res);
            }
            catch (e) {
                return res.status(400).json({ value: ['message' in e ? e.message : 'Inspected Error'] });
            }
        });
    }
    register(key, controller) {
        this.manager.attach(key, controller);
        return this;
    }
    unregister(key) {
        return this.manager.detach(key);
    }
}
exports.Dispatcher = Dispatcher;
exports.default = Dispatcher;
//# sourceMappingURL=dispatcher.js.map
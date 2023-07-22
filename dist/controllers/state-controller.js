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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateController = void 0;
const state_service_1 = require("../services/state-service");
const abstract_controller_1 = require("../abstract/abstract-controller");
const attribute_extractor_1 = require("../utils/attribute-extractor");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class StateController extends abstract_controller_1.AbstractController {
    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service) {
        super(service);
        Object.defineProperty(this, "service", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.service = service;
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    getByName(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        name: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getByName(name));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    getQttByName(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        name: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getQttByName(name));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    isNameInUse(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        name: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.isNameInUse(name));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Default factory method.
     */
    static default() {
        return new StateController(new state_service_1.StateService());
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    getByInitials(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { initials } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        initials: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getByInitials(initials));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    getQttByInitials(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { initials } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        initials: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getQttByInitials(initials));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    isInitialsInUse(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { initials } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        initials: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.isInitialsInUse(initials));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
}
exports.StateController = StateController;
//# sourceMappingURL=state-controller.js.map
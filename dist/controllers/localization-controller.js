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
exports.LocalizationController = void 0;
const abstract_controller_1 = require("../abstract/abstract-controller");
const localization_service_1 = require("../services/localization-service");
const attribute_extractor_1 = require("../utils/attribute-extractor");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
const utils_1 = require("../utils/utils");
class LocalizationController extends abstract_controller_1.AbstractController {
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
     * Default factory method.
     */
    static default() {
        return new LocalizationController(new localization_service_1.LocalizationService());
    }
    getCurrentLocationByProductId(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProduct } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        idProduct: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getCurrentLocationByProductId(utils_1.Utils.normalizeKey(idProduct)));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getQttByProductId(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProduct } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        idProduct: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getQttByProductId(utils_1.Utils.normalizeKey(idProduct)));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getAllByProductId(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProduct } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        idProduct: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getAllByProductId(utils_1.Utils.normalizeKey(idProduct)));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getAllByProductIdAndInterval(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProduct, startInterval, endInterval } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
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
                            isRequired: false,
                            notEmpty: false,
                        },
                    }
                });
                return res.json(yield this.service.getAllByProductIdAndInterval(utils_1.Utils.normalizeKey(idProduct), startInterval, endInterval));
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
exports.LocalizationController = LocalizationController;
//# sourceMappingURL=localization-controller.js.map
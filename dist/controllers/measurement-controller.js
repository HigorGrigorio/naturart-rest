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
exports.MeasurementController = void 0;
const abstract_controller_1 = require("../abstract/abstract-controller");
const measurement_service_1 = require("../services/measurement-service");
const attribute_extractor_1 = require("../utils/attribute-extractor");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
const utils_1 = require("../utils/utils");
class MeasurementController extends abstract_controller_1.AbstractController {
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
        return new MeasurementController(new measurement_service_1.MeasurementService());
    }
    getByProductId(req, res) {
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
                return res.json(yield this.service.getByProductId(utils_1.Utils.normalizeKey(idProduct)));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getByProductIdAndInterval(req, res) {
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
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getByProductIdAndInterval(utils_1.Utils.normalizeKey(idProduct), startInterval, endInterval));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getByProductAndType(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProduct, idSensorType } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        idProduct: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        idSensorType: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getByProductAndType(utils_1.Utils.normalizeKey(idProduct), utils_1.Utils.normalizeKey(idSensorType)));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getByProductIdAndTypeAndInterval(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProduct, idSensorType, startInterval, endInterval } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        idProduct: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        idSensorType: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        startInterval: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        endInterval: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getByProductIdAndTypeAndInterval(utils_1.Utils.normalizeKey(idProduct), utils_1.Utils.normalizeKey(idSensorType), startInterval, endInterval));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getProductByMeasurementId(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idMeasurement } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        idMeasurement: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getProductByMeasurementId(utils_1.Utils.normalizeKey(idMeasurement)));
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
exports.MeasurementController = MeasurementController;
//# sourceMappingURL=measurement-controller.js.map
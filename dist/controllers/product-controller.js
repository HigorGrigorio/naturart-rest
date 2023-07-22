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
exports.ProductController = void 0;
const abstract_controller_1 = require("../abstract/abstract-controller");
const product_service_1 = require("../services/product-service");
const attribute_extractor_1 = require("../utils/attribute-extractor");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
const utils_1 = require("../utils/utils");
class ProductController extends abstract_controller_1.AbstractController {
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
        return new ProductController(new product_service_1.ProductService());
    }
    add(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serialCode, name } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        serialCode: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        name: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const result = yield this.service.add({ serialCode, name });
                return res.json(result);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, serialCode, name } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        id: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        serialCode: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        name: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const result = yield this.service.update({ id }, { serialCode, name });
                return res.json(result);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getBySerialCode(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serialCode } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        serialCode: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getBySerialCode(serialCode));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
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
    getQttBySensorTypeId(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSensorType } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        idSensorType: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getQttBySensorTypeId(utils_1.Utils.normalizeKey(idSensorType)));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getTypeByProductId(req, res) {
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
                return res.json(yield this.service.getTypeByProductId(utils_1.Utils.normalizeKey(idProduct)));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    isSerialCodeInUse(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serialCode } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        serialCode: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.isSerialCodeInUse(serialCode));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
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
}
exports.ProductController = ProductController;
//# sourceMappingURL=product-controller.js.map
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
exports.InvoiceItemController = void 0;
const abstract_controller_1 = require("../abstract/abstract-controller");
const invoice_item_service_1 = require("../services/invoice-item-service");
const attribute_extractor_1 = require("../utils/attribute-extractor");
const utils_1 = require("../utils/utils");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class InvoiceItemController extends abstract_controller_1.AbstractController {
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
        return new InvoiceItemController(new invoice_item_service_1.InvoiceItemService());
    }
    getCurrentLocalizationByProductId(req, res) {
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
                return res.json(yield this.service.getCurrentLocalizationByProductId(utils_1.Utils.normalizeKey(idProduct)));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getLocationsByProductId(req, res) {
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
                return res.json(yield this.service.getLocationsByProductId(utils_1.Utils.normalizeKey(idProduct)));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getQttLocationsByProductId(req, res) {
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
                return res.json(yield this.service.getQttLocationsByProductId(utils_1.Utils.normalizeKey(idProduct)));
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
exports.InvoiceItemController = InvoiceItemController;
//# sourceMappingURL=invoice-item-controller.js.map
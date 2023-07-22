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
exports.InvoiceController = void 0;
const abstract_controller_1 = require("../abstract/abstract-controller");
const invoice_service_1 = require("../services/invoice-service");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
const attribute_extractor_1 = require("../utils/attribute-extractor");
const utils_1 = require("../utils/utils");
class InvoiceController extends abstract_controller_1.AbstractController {
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
        return new InvoiceController(new invoice_service_1.InvoiceService());
    }
    getByInvoiceNumber(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { invoiceNumber } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        invoiceNumber: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const result = yield this.service.getByInvoiceNumber(utils_1.Utils.normalizeKey(invoiceNumber));
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
    getByClientId(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idClient } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        idClient: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const result = yield this.service.getByClientId(utils_1.Utils.normalizeKey(idClient));
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
    getQttByClientId(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idClient } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        idClient: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const result = yield this.service.getQttByClientId(utils_1.Utils.normalizeKey(idClient));
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
    isInvoiceNumberInUse(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { invoiceNumber } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        invoiceNumber: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const result = yield this.service.isInvoiceNumberInUse(utils_1.Utils.normalizeKey(invoiceNumber));
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
}
exports.InvoiceController = InvoiceController;
//# sourceMappingURL=invoice-controller.js.map
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
exports.InvoiceService = void 0;
const abstract_service_1 = require("../abstract/abstract-service");
const invoice_1 = require("../models/invoice");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class InvoiceService extends abstract_service_1.AbstractService {
    constructor() {
        super(invoice_1.Invoice);
    }
    getByInvoiceNumber(invoiceNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield invoice_1.Invoice.findOne({
                where: { invoiceNumber }
            });
            if (!invoice) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined invoice with number '${invoiceNumber}'`
                });
            }
            return new naturart_response_1.default({
                data: invoice,
                msg: 'Search performs successfully'
            });
        });
    }
    getByClientId(idClient) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield invoice_1.Invoice.findAll({
                where: { idClient }
            });
            return new naturart_response_1.default({
                data: invoices,
                msg: 'Search performs successfully'
            });
        });
    }
    getQttByClientId(idClient) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield invoice_1.Invoice.count({
                where: { idClient }
            });
            return new naturart_response_1.default({
                data: invoices,
                msg: 'Search performs successfully'
            });
        });
    }
    isInvoiceNumberInUse(invoiceNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield invoice_1.Invoice.findOne({
                where: { invoiceNumber }
            });
            return new naturart_response_1.default({
                data: invoice !== null,
                msg: 'Search performs successfully'
            });
        });
    }
}
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoice-service.js.map
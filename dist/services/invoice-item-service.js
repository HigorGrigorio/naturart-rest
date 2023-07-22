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
exports.InvoiceItemService = void 0;
const abstract_service_1 = require("../abstract/abstract-service");
const invoice_item_1 = require("../models/invoice-item");
const localization_service_1 = require("./localization-service");
class InvoiceItemService extends abstract_service_1.AbstractService {
    constructor() {
        super(invoice_item_1.InvoiceItem);
    }
    getCurrentLocalizationByProductId(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (new localization_service_1.LocalizationService()).getCurrentLocationByProductId(idProduct);
        });
    }
    getLocationsByProductId(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (new localization_service_1.LocalizationService()).getAllByProductId(idProduct);
        });
    }
    getQttLocationsByProductId(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (new localization_service_1.LocalizationService()).getQttByProductId(idProduct);
        });
    }
}
exports.InvoiceItemService = InvoiceItemService;
//# sourceMappingURL=invoice-item-service.js.map
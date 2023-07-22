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
exports.AddressService = void 0;
const abstract_service_1 = require("../abstract/abstract-service");
const address_1 = require("../models/address");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class AddressService extends abstract_service_1.AbstractService {
    constructor() {
        super(address_1.Address);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield address_1.Address.findAll({
                attributes: ['id', 'number', 'complement', 'createdAt', 'updatedAt'],
                include: ['streetCity', 'districtCity', 'clients', 'cep']
            });
            return new naturart_response_1.default({
                data: results,
                msg: 'Search performs successfully'
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield address_1.Address.findByPk(id, {
                attributes: ['id', 'number', 'complement', 'createdAt', 'updatedAt'],
                include: ['streetCity', 'districtCity', 'clients', 'cep']
            });
            if (!result) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `undefined address with id ${id}`
                });
            }
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
}
exports.AddressService = AddressService;
exports.default = AddressService;
//# sourceMappingURL=address-service.js.map
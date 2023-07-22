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
exports.StreetService = void 0;
const abstract_service_1 = require("../abstract/abstract-service");
const street_1 = require("../models/street");
const utils_1 = require("../utils/utils");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class StreetService extends abstract_service_1.AbstractService {
    constructor() {
        super(street_1.Street);
    }
    /**
     * Get a model with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<Street[]>}  A array of model with base in the name.
     */
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield street_1.Street.findAll({
                where: utils_1.Utils.where('`Street`.`name`', name)
            });
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Get Quantity of models with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<NaturartResponse<>number>} The quantity of models with base in the name.
     */
    getQttByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield street_1.Street.count({
                where: utils_1.Utils.where('`Street`.`name`', name),
            });
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Returns if model is in use with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<NaturartResponse<>boolean>} True if the name is in use, false otherwise.
     */
    isNameInUse(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield street_1.Street.findOne({
                where: utils_1.Utils.where('`Street`.`name`', name)
            })) != null;
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
}
exports.StreetService = StreetService;
//# sourceMappingURL=street-service.js.map
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
exports.DistrictService = void 0;
const district_1 = require("../models/district");
const naturart_response_1 = require("../utils/naturart-response");
const utils_1 = require("../utils/utils");
const abstract_service_1 = require("../abstract/abstract-service");
class DistrictService extends abstract_service_1.AbstractService {
    constructor() {
        super(district_1.District);
    }
    /**
     * Get a model with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<District[]>}  A array of model with base in the name.
     */
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield district_1.District.findAll({
                where: utils_1.Utils.where('`District`.`name`', name),
            });
            return new naturart_response_1.NaturartResponse({
                msg: 'Search performs successfully',
                data: result
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
            const result = yield district_1.District.count({
                where: utils_1.Utils.where('`District`.`name`', name),
            });
            return new naturart_response_1.NaturartResponse({
                msg: 'Search performs successfully',
                data: result
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
            const result = (yield district_1.District.findOne({
                where: utils_1.Utils.where('`District`.`name`', name)
            })) != null;
            return new naturart_response_1.NaturartResponse({
                msg: 'Search performs successfully',
                data: result
            });
        });
    }
}
exports.DistrictService = DistrictService;
//# sourceMappingURL=district-service.js.map
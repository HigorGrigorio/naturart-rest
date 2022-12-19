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
exports.StateService = void 0;
const state_1 = require("../models/state");
const abstract_service_1 = require("../abstract/abstract-service");
const utils_1 = require("../utils/utils");
const district_1 = require("../models/district");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class StateService extends abstract_service_1.AbstractService {
    constructor() {
        super(state_1.State);
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
                include: Object.values(state_1.State.associations),
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
            const result = yield district_1.District.count({
                where: utils_1.Utils.where('`District`.`name`', name),
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
            const result = (yield state_1.State.findOne({
                where: utils_1.Utils.where('`District`.`name`', name)
            })) != null;
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Get a model with base in the initials.
     *
     * @param initials : string Initials of model.
     * @returns {Promise<State[]>}  A array of model with base in the initials.
     */
    getByInitials(initials) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield state_1.State.findAll({
                where: utils_1.Utils.where('`State`.`initials`', initials),
                include: Object.values(state_1.State.associations),
            });
            if (!result) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined state with initials '${initials}'`
                });
            }
            return new naturart_response_1.default({
                msg: 'Search performs successfully',
                data: result,
            });
        });
    }
    /**
     * Get Quantity of models with base in the initials.
     *
     * @param initials : string Initials of model.
     * @returns {Promise<number>} The quantity of models with base in the initials.
     */
    getQttByInitials(initials) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield state_1.State.count({
                where: utils_1.Utils.where('`State`.`initials`', initials),
            });
            return new naturart_response_1.default({
                msg: 'Search performs successfully',
                data: result,
            });
        });
    }
    /**
     * Returns if model is in use with base in the initials.
     *
     * @param initials : string Initials of model.
     * @returns {Promise<boolean>} True if the initials is in use, false otherwise.
     */
    isInitialsInUse(initials) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield state_1.State.findOne({
                where: utils_1.Utils.where('`State`.`initials`', initials)
            })) != null;
            return new naturart_response_1.default({
                msg: 'Search performs successfully',
                data: result,
            });
        });
    }
}
exports.StateService = StateService;
//# sourceMappingURL=state-service.js.map
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
exports.CityService = void 0;
const city_1 = require("../models/city");
const sequelize_1 = require("sequelize");
const utils_1 = require("../utils/utils");
const district_1 = require("../models/district");
const abstract_service_1 = require("../abstract/abstract-service");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class CityService extends abstract_service_1.AbstractService {
    /**
     * Construct a new instance of entity.
     */
    constructor() {
        super(city_1.City);
    }
    /**
     * Get a model with base in the name.
     *
     * @param name : string Name of model.
     * @returns {Promise<City[]>}  A array of model with base in the name.
     */
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield city_1.City.findAll({
                where: utils_1.Utils.where('`City`.`name`', name),
                include: Object.values(city_1.City.associations),
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
            const result = yield city_1.City.count({
                where: utils_1.Utils.where('`City`.`name`', name),
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
            const result = (yield city_1.City.findOne({
                where: utils_1.Utils.where('`City`.`name`', name)
            })) != null;
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Get the cities with in the state base in the name of city and the name of state.
     *
     * @param city Name of the city
     * @param state Name or initials of the state.
     */
    getByNameAndState(city, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield city_1.City.findAll({
                where: {
                    [sequelize_1.Op.and]: [
                        utils_1.Utils.where('`City`.`name`', city),
                        {
                            idState: {
                                [sequelize_1.Op.eq]: (0, sequelize_1.literal)(`(
                                SELECT id
                                FROM state
                                WHERE
                                    upper(remove_accents(` + '`State`.`name`' + `)) = upper(remove_accents('${state}')) OR
                                    upper(remove_accents(` + '`State`.`initials`' + `)) = upper(remove_accents('${state}')) 
                            )`)
                            }
                        }
                    ]
                },
                order: (0, sequelize_1.col)('name'),
                include: Object.values(city_1.City.associations),
            });
            if (result.length == 0) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: 'Undefined city `' + city + '` in state `' + state + '`'
                });
            }
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Get the cities with in the state base in the name of city and the name of state.
     *
     * @param city Name of the city
     */
    getDistrictsByCity(city) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield city_1.City.findAll({
                where: utils_1.Utils.where('\`City\`.\`name\`', city),
                attributes: ['name'],
                include: {
                    model: district_1.District,
                    as: 'districts',
                    through: {
                        attributes: []
                    }
                }
            });
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Get the quantity of cities with in the state base in the name of city and the name of state.
     *
     * @param city Name of the city
     * @param state Name or initials of the state.
     */
    getQttByNameAndState(city, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield city_1.City.count({
                where: {
                    [sequelize_1.Op.and]: [
                        utils_1.Utils.where('`City`.`name`', city),
                        {
                            idState: {
                                [sequelize_1.Op.eq]: (0, sequelize_1.literal)(`(
                                SELECT id
                                FROM state
                                WHERE
                                    upper(remove_accents(` + '`State`.`name`' + `)) = upper(remove_accents('${state}')) OR
                                    upper(remove_accents(` + '`State`.`initials`' + `)) = upper(remove_accents('${state}')) 
                            )`)
                            }
                        }
                    ]
                }
            });
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Checks if the city exits in the state.
     *
     * @param city Name of the city.
     * @param state Name or initials of the state.
     */
    isCityInState(city, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield city_1.City.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        utils_1.Utils.where('`City`.`name`', city),
                        {
                            idState: {
                                [sequelize_1.Op.eq]: (0, sequelize_1.literal)(`(
                                SELECT id
                                FROM state
                                WHERE
                                    upper(remove_accents(` + '`State`.`name`' + `)) = upper(remove_accents('${state}')) OR
                                    upper(remove_accents(` + '`State`.`initials`' + `)) = upper(remove_accents('${state}')) 
                            )`)
                            }
                        }
                    ]
                }
            })) != null;
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
}
exports.CityService = CityService;
//# sourceMappingURL=city-service.js.map
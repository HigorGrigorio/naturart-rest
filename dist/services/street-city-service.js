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
exports.StreetCityService = void 0;
const street_city_1 = require("../models/street-city");
const abstract_service_1 = require("../abstract/abstract-service");
const sequelize_1 = require("sequelize");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
const city_1 = require("../models/city");
const street_type_1 = require("../models/street-type");
const street_1 = require("../models/street");
class StreetCityService extends abstract_service_1.AbstractService {
    constructor() {
        super(street_city_1.StreetCity);
    }
    /**
     * Gets all streets in cities
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield street_city_1.StreetCity.findAll({
                attributes: ['id', 'updatedAt', 'createdAt'],
                include: [
                    {
                        model: city_1.City,
                        as: 'city',
                    },
                    {
                        model: street_type_1.StreetType,
                        as: 'streetType',
                    },
                    {
                        model: street_1.Street,
                        as: 'street'
                    }
                ]
            });
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     *
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield street_city_1.StreetCity.findByPk(id, {
                attributes: ['id', 'updatedAt', 'createdAt'],
                include: [
                    {
                        model: city_1.City,
                        as: 'city',
                    },
                    {
                        model: street_type_1.StreetType,
                        as: 'streetType',
                    },
                    {
                        model: street_1.Street,
                        as: 'street'
                    }
                ]
            });
            if (!result) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined street city with id '${id}'`
                });
            }
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Gets a street with base in the name and the city id.
     *
     * @param name Name of the street.
     * @param idCity Id of the city.
     */
    getByNameAndCityId(name, idCity) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield street_city_1.StreetCity.findOne({
                where: {
                    idCity,
                    idStreet: (0, sequelize_1.literal)(`(
                    SELECT \`Street\`.\`id\`
                    FROM \`Street\` AS \`Street\`
                    WHERE upper(remove_accents(\`Street\`.\`name\`)) = upper(remove_accents(\'${name}\'))
                    LIMIT 1
                )`),
                },
                attributes: ['id', 'updatedAt', 'createdAt'],
                include: [
                    {
                        model: city_1.City,
                        as: 'city',
                    },
                    {
                        model: street_type_1.StreetType,
                        as: 'streetType',
                    },
                    {
                        model: street_1.Street,
                        as: 'street'
                    }
                ]
            });
            if (!result) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined street ${name} in city with id ${idCity}`
                });
            }
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Gets the quantity of the streets with base in the name and the city name.
     *
     @param name Name of the street.
     @param city Name of the city.
     */
    getQttDistrictsInCity(name, city) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield street_city_1.StreetCity.count({
                where: {
                    idCity: {
                        [sequelize_1.Op.eq]: (0, sequelize_1.literal)(`(
                            SELECT \`City\`.\`id\`
                            FROM \`City\` AS \`City\`
                            WHERE upper(remove_accents(\`City\`.\`name\`)) = upper(remove_accents('${city}'))
                            LIMIT 1
                        )`)
                    },
                    idStreet: {
                        [sequelize_1.Op.eq]: (0, sequelize_1.literal)(`(
                            SELECT \`Street\`.\`id\`
                            FROM \`Street\` AS \`Street\`
                            WHERE upper(remove_accents(\`Street\`.\`name\`)) = upper(remove_accents('${name}'))
                            LIMIT 1
                        )`),
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
     * Check if the name of street is in use to city.
     *
     * @param name Name of the street.
     * @param idCity Id of the city.
     */
    isNameInUse(name, idCity) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield street_city_1.StreetCity.findOne({
                where: {
                    idCity,
                    idStreet: (0, sequelize_1.literal)(`(
                    SELECT \`Street\`.\`id\`
                    FROM \`Street\` AS \`Street\`
                    WHERE upper(remove_accents(\`Street\`.\`name\`)) = upper(remove_accents(\'${name}\'))
                    LIMIT 1
                )`),
                }
            })) != null;
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
}
exports.StreetCityService = StreetCityService;
//# sourceMappingURL=street-city-service.js.map
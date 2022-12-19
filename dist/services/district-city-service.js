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
exports.DistrictCityService = void 0;
const abstract_service_1 = require("../abstract/abstract-service");
const district_city_1 = require("../models/district-city");
const district_1 = require("../models/district");
const sequelize_1 = require("sequelize");
const utils_1 = require("../utils/utils");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class DistrictCityService extends abstract_service_1.AbstractService {
    /**
     * Construct a new instance of entity.
     */
    constructor() {
        super(district_city_1.DistrictCity);
    }
    /**
     * Get a city with base in the name of district and id of the city.
     *
     * @param name Name of the district.
     * @param idCity Id of the city
     */
    getByNameAndCityId(name, idCity) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield district_1.District.findAll({
                where: {
                    [sequelize_1.Op.and]: [
                        utils_1.Utils.where('\`District\`.\`name\`', name),
                        {
                            id: {
                                [sequelize_1.Op.eq]: (0, sequelize_1.literal)(`(
                        SELECT \`DistrictCity\`.\`idDistrict\`
                        FROM 
                            \`DistrictCity\` AS \`DistrictCity\`,
                            \`City\` AS \`City\`
                        WHERE
                            \`DistrictCity\`.\`idCity\` = ${idCity}
                        LIMIT 1
                    )`)
                            }
                        }
                    ]
                }
            });
            if (result.length === 0) {
                return new naturart_response_1.default({
                    msg: `Undefined district '${name}' in city with id '${idCity}'`,
                    isError: true
                });
            }
            return new naturart_response_1.default({
                msg: 'Search performs successfully',
                data: result
            });
        });
    }
    /**
     * Get the quantity of districts with base in the name of districts and city name.
     *
     * @param name Name of the district.
     * @param city Id of the city
     */
    getQttDistrictsByNameInCity(name, city) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield district_1.District.count({
                where: {
                    [sequelize_1.Op.and]: [
                        utils_1.Utils.where('\`District\`.\`name\`', name),
                        {
                            id: {
                                [sequelize_1.Op.eq]: (0, sequelize_1.literal)(`(
                            SELECT \`DistrictCity\`.\`idDistrict\`
                            FROM 
                                \`DistrictCity\` AS \`DistrictCity\`,
                                \`City\` AS \`City\`
                            WHERE
                                \`DistrictCity\`.\`idCity\` = \`City\`.\`id\` AND
                                upper(remove_accents(\`City\`.\`name\`)) = upper(remove_accents('${city}'))
                            LIMIT 1 )`)
                            }
                        }
                    ]
                }
            });
            return new naturart_response_1.default({
                msg: 'Search performs successfully',
                data: result
            });
        });
    }
}
exports.DistrictCityService = DistrictCityService;
//# sourceMappingURL=district-city-service.js.map
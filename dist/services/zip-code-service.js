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
exports.ZipCodeService = void 0;
const abstract_service_1 = require("../abstract/abstract-service");
const zip_code_1 = require("../models/zip-code");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
const city_1 = require("../models/city");
const district_1 = require("../models/district");
const street_1 = require("../models/street");
const street_city_1 = require("../models/street-city");
const street_type_1 = require("../models/street-type");
const state_1 = require("../models/state");
const attribute_extractor_1 = require("../utils/attribute-extractor");
const state_service_1 = require("./state-service");
const district_service_1 = require("./district-service");
const city_service_1 = require("./city-service");
const district_city_service_1 = require("./district-city-service");
const street_service_1 = require("./street-service");
const street_city_service_1 = require("./street-city-service");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class ZipCodeService extends abstract_service_1.AbstractService {
    constructor() {
        super(zip_code_1.ZipCode);
    }
    /**
     * Get All models instances from database.
     *
     * @returns {Promise<ZipCode[]>} All models.
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield zip_code_1.ZipCode.findAll({
                attributes: ['id', 'createdAt', 'updatedAt', 'code'],
                include: [{
                        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                        model: city_1.City,
                        as: 'city',
                        include: [{
                                attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                                model: state_1.State,
                                as: 'state'
                            }, {
                                model: district_1.District,
                                as: 'districts',
                                through: { attributes: [] }
                            }]
                    }, {
                        attributes: ['id', 'idCity', 'createdAt', 'updatedAt'],
                        model: street_city_1.StreetCity,
                        as: 'streetInfo',
                        include: [{
                                model: street_1.Street,
                                as: 'street'
                            }, {
                                model: street_type_1.StreetType,
                                as: 'streetType'
                            }]
                    }]
            });
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Finds a model with base in the id.
     *
     * @param id : number Id to find.
     * @returns {Promise<ZipCode>} A model with base in the id.
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield zip_code_1.ZipCode.findByPk(id, {
                attributes: ['id', 'createdAt', 'updatedAt', 'code'],
                include: [{
                        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                        model: city_1.City,
                        as: 'city',
                        include: [{
                                attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                                model: state_1.State,
                                as: 'state'
                            }, {
                                model: district_1.District,
                                as: 'districts',
                                through: { attributes: [] }
                            }]
                    }, {
                        attributes: ['id', 'idCity', 'createdAt', 'updatedAt'],
                        model: street_city_1.StreetCity,
                        as: 'streetInfo',
                        include: [{
                                model: street_1.Street,
                                as: 'street'
                            }, {
                                model: street_type_1.StreetType,
                                as: 'streetType'
                            }]
                    }]
            });
            if (!result) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined error with id '${id}'.`
                });
            }
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Get districts with base in the cep number.
     *
     * @param code
     */
    getDistrictsByCepNumber(code) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const [results, metadata] = (_b = yield ((_a = zip_code_1.ZipCode.sequelize) === null || _a === void 0 ? void 0 : _a.query(`
            SELECT  
                \`District\`.\`id\`,
                \`District\`.\`name\`,
                \`District\`.\`createdAt\`,
                \`District\`.\`updatedAt\`
            FROM
                \`District\` AS \`District\`,
                \`ZipCode\` AS \`ZipCode\`,
                \`DistrictCity\` AS \`DistrictCity\`
            WHERE 
                \`ZipCode\`.\`code\` = ${code}
                AND \`ZipCode\`.\`idDistrictCity\` = \`DistrictCity\`.\`id\` 
                AND \`DistrictCity\`.\`idDistrict\` = \`District\`.\`id\`
        `))) !== null && _b !== void 0 ? _b : [[], 0];
            if (results.length == 0) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined cep with code '${code}'`
                });
            }
            return new naturart_response_1.default({
                data: Object.values(results).map(value => (new district_1.District).setAttributes(attribute_extractor_1.AttributeExtractor.extract(value, { all: true }))),
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Get streets by cep number.
     *
     * @param code
     */
    getStreetsByCepNumber(code) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const [results, metadata] = (_b = yield ((_a = zip_code_1.ZipCode.sequelize) === null || _a === void 0 ? void 0 : _a.query(`
            SELECT  
                \`Street\`.\`id\`,
                \`Street\`.\`name\`,
                \`Street\`.\`createdAt\`,
                \`Street\`.\`updatedAt\`
            FROM
                \`Street\` AS \`Street\`,
                \`ZipCode\` AS \`ZipCode\`,
                \`StreetCity\` AS \`StreetCity\`
            WHERE 
                \`ZipCode\`.\`code\` = ${code}
                AND \`ZipCode\`.\`idStreetCity\` = \`StreetCity\`.\`id\` 
                AND \`StreetCity\`.\`idStreet\` = \`Street\`.\`id\`
        `))) !== null && _b !== void 0 ? _b : [[], 0];
            return new naturart_response_1.default({
                data: Object.values(results).map(value => (new street_1.Street).setAttributes(attribute_extractor_1.AttributeExtractor.extract(value, { all: true }))),
                msg: 'Search performs successfully'
            });
        });
    }
    /**
     * Get a cep with base in the number.
     *
     * @param code
     */
    getByNumber(code) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            code = code.replace(/\D/g, '');
            if ((yield zip_code_1.ZipCode.count({ where: { code } })) == 0) {
                const response = yield (0, cross_fetch_1.default)(`https://viacep.com.br/ws/${code}/json/`);
                const body = yield response.json();
                if (!('error' in body)) {
                    const { cep, logradouro, complemento, bairro, localidade, uf } = body;
                    const states = {
                        AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas',
                        BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo',
                        GO: 'Goiás', MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul',
                        MG: 'Minas Gerais', PA: 'Pará', PB: 'Paraíba', PR: 'Paraná',
                        PE: 'Pernambuco', PI: 'Piauí', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte',
                        RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina',
                        SP: 'São Paulo', SE: 'Sergipe', TO: 'Tocantins'
                    };
                    // Inserts a new cep on database.
                    let idState;
                    let idDistrict;
                    let idCity;
                    let idDistrictCity;
                    let idStreet;
                    let idStreetCity = 0;
                    // Inserts UF if not exists.
                    const stateService = new state_service_1.StateService();
                    if (!(yield stateService.isInitialsInUse(uf)).data) {
                        idState = (yield stateService.add({
                            name: states[uf],
                            initials: uf
                        }).then(obj => { var _a; return (_a = obj.data) === null || _a === void 0 ? void 0 : _a.id; })) || 0;
                    }
                    else {
                        idState = (yield stateService.getByInitials(uf).then(obj => { var _a, _b; return (_b = (_a = obj.data) === null || _a === void 0 ? void 0 : _a.at(0)) === null || _b === void 0 ? void 0 : _b.id; })) || 0;
                    }
                    // Inserts district if not exits.
                    const districtService = new district_service_1.DistrictService();
                    if (!(yield districtService.isNameInUse(bairro)).data) {
                        idDistrict = (yield districtService.add({ name: bairro }).then(obj => { var _a; return (_a = obj.data) === null || _a === void 0 ? void 0 : _a.id; })) || 0;
                    }
                    else {
                        idDistrict = (yield districtService.getByName(bairro).then(obj => { var _a, _b; return (_b = (_a = obj.data) === null || _a === void 0 ? void 0 : _a.at(0)) === null || _b === void 0 ? void 0 : _b.id; })) || 0;
                    }
                    // Inserts city if not exits.
                    const cityService = new city_service_1.CityService();
                    if (!(yield cityService.isNameInUse(localidade)).data) {
                        idCity = (yield cityService.add({ name: localidade, idState }).then(obj => { var _a; return (_a = obj.data) === null || _a === void 0 ? void 0 : _a.id; })) || 0;
                    }
                    else {
                        idCity = (yield cityService.getByName(localidade).then(obj => { var _a, _b; return (_b = (_a = obj.data) === null || _a === void 0 ? void 0 : _a.at(0)) === null || _b === void 0 ? void 0 : _b.id; })) || 0;
                    }
                    // Binds the city with de district.
                    const districtCityService = new district_city_service_1.DistrictCityService();
                    if (!(yield districtCityService.getByNameAndCityId(localidade, idCity)).data) {
                        idDistrictCity = (yield districtCityService.add({
                            idCity,
                            idDistrict
                        }).then(obj => { var _a; return (_a = obj.data) === null || _a === void 0 ? void 0 : _a.id; })) || 0;
                    }
                    else {
                        idDistrictCity = (yield districtCityService.getByNameAndCityId(localidade, idCity).then(obj => { var _a, _b; return (_b = (_a = obj.data) === null || _a === void 0 ? void 0 : _a.at(0)) === null || _b === void 0 ? void 0 : _b.id; })) || 0;
                    }
                    // Inserts street if not exists.
                    if (logradouro.length > 0) {
                        const streetService = new street_service_1.StreetService();
                        if (!(yield streetService.isNameInUse(logradouro)).data) {
                            idStreet = ((_a = (yield streetService.add({ name: logradouro })).data) === null || _a === void 0 ? void 0 : _a.id) || null;
                        }
                        else {
                            idStreet = ((_c = (_b = (yield streetService.getByName(logradouro)).data) === null || _b === void 0 ? void 0 : _b.at(0)) === null || _c === void 0 ? void 0 : _c.id) || null;
                        }
                        if (idStreet) {
                            const streetCityService = new street_city_service_1.StreetCityService();
                            if (!(yield streetCityService.isNameInUse(logradouro, idCity)).data) {
                                idStreetCity = ((_d = (yield streetCityService.add({ idCity, idStreet })).data) === null || _d === void 0 ? void 0 : _d.id) || 0;
                            }
                            else {
                                idStreetCity = ((_e = (yield streetCityService.getByNameAndCityId(logradouro, idCity)).data) === null || _e === void 0 ? void 0 : _e.id) || 0;
                            }
                        }
                    }
                    else {
                        idStreetCity = 0;
                    }
                    if (idStreetCity != null && idStreetCity > 0) {
                        yield zip_code_1.ZipCode.create({ idDistrictCity, idCity, code, idStreetCity });
                    }
                    else {
                        yield zip_code_1.ZipCode.create({ idDistrictCity, idCity, code });
                    }
                }
            }
            const result = yield zip_code_1.ZipCode.findAll({
                where: {
                    code
                },
                attributes: ['id', 'createdAt', 'updatedAt', 'code'],
                include: [{
                        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                        model: city_1.City,
                        as: 'city',
                        include: [{
                                attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                                model: state_1.State,
                                as: 'state'
                            }, {
                                model: district_1.District,
                                as: 'districts',
                                through: { attributes: [] }
                            }]
                    }, {
                        attributes: ['id', 'idCity', 'createdAt', 'updatedAt'],
                        model: street_city_1.StreetCity,
                        as: 'streetInfo',
                        include: [{
                                model: street_1.Street,
                                as: 'street'
                            }, {
                                model: street_type_1.StreetType,
                                as: 'streetType'
                            }]
                    }]
            });
            if (!result) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined error with id '${code}'.`
                });
            }
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
}
exports.ZipCodeService = ZipCodeService;
exports.default = ZipCodeService;
//# sourceMappingURL=zip-code-service.js.map
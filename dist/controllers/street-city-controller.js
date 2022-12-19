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
exports.StreetCityController = void 0;
const abstract_controller_1 = require("../abstract/abstract-controller");
const street_city_service_1 = require("../services/street-city-service");
const utils_1 = require("../utils/utils");
const attribute_extractor_1 = require("../utils/attribute-extractor");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class StreetCityController extends abstract_controller_1.AbstractController {
    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service) {
        super(service);
        Object.defineProperty(this, "service", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.service = service;
    }
    /**
     * Default factory method.
     */
    static default() {
        return new StreetCityController(new street_city_service_1.StreetCityService());
    }
    /**
     * Get the street with in the id of City and the name of street.
     *
     * @param req The request.
     * @param res The response.
     */
    getByNameAndCityId(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, idCity } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        name: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        idCity: {
                            isRequired: true,
                            notEmpty: true
                        }
                    }
                });
                const response = yield this.service.getByNameAndCityId(name, utils_1.Utils.normalizeKey(idCity));
                if (response.isError) {
                    response.msg = 'Undefined street';
                }
                else {
                    response.msg = 'Search performs successfully';
                }
                return res.json(response);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Get the quantity of streets with in the name of City and the name of street.
     *
     * @param req The request.
     * @param res The response.
     */
    getQttByDistrictsInCity(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, city } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        name: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        city: {
                            isRequired: true,
                            notEmpty: true
                        }
                    }
                });
                const response = yield this.service.getQttByDistrictsInCity(name, city);
                response.msg = 'Search performs successfully';
                return res.json(response);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Get the street with in the id of City and the name of street.
     *
     * @param req The request.
     * @param res The response.
     */
    isNameInUse(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, idCity } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        name: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        idCity: {
                            isRequired: true,
                            notEmpty: true
                        }
                    }
                });
                const response = yield this.service.isNameInUse(name, utils_1.Utils.normalizeKey(idCity));
                response.msg = 'Search performs successfully';
                return res.json(response);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
}
exports.StreetCityController = StreetCityController;
//# sourceMappingURL=street-city-controller.js.map
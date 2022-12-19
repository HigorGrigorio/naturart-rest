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
exports.CityController = void 0;
const city_service_1 = require("../services/city-service");
const abstract_controller_1 = require("../abstract/abstract-controller");
const attribute_extractor_1 = require("../utils/attribute-extractor");
const naturart_response_1 = require("../utils/naturart-response");
class CityController extends abstract_controller_1.AbstractController {
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
        return new CityController(new city_service_1.CityService());
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    getByName(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        name: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getByName(name));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.NaturartResponse({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    getQttByName(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        name: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getQttByName(name));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.NaturartResponse({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    isNameInUse(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        name: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.isNameInUse(name));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.NaturartResponse({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Get the cities with in the state base in the name of city and the name of state.
     *
     * @param req The request.
     * @param res The response.
     */
    getByNameAndState(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { city, state } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        city: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        state: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getByNameAndState(city, state));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.NaturartResponse({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Get the cities with in the state base in the name of city and the name of state.
     *
     * @param req The request.
     * @param res The response.
     */
    getDistrictsByCity(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { city } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        city: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const response = yield this.service.getDistrictsByCity(city);
                response.msg = 'Search performs successfully';
                return res.json(response);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.NaturartResponse({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Get the quantity of cities with in the state base in the name of city and the name of state.
     *
     * @param req The request.
     * @param res The response.
     */
    getQttByNameAndState(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { city, state } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        city: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        state: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const response = yield this.service.getQttByNameAndState(city, state);
                response.msg = 'Search performs successfully';
                return res.json(response);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.NaturartResponse({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Checks if the city exits in the state.
     *
     * @param req The request.
     * @param res The response.
     */
    isCityInState(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { city, state } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        city: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const response = yield this.service.isCityInState(city, state);
                response.msg = 'Search performs successfully';
                return res.json(response);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.NaturartResponse({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
}
exports.CityController = CityController;
//# sourceMappingURL=city-controller.js.map
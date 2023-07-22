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
exports.ZipCodeController = void 0;
const abstract_controller_1 = require("../abstract/abstract-controller");
const zip_code_service_1 = require("../services/zip-code-service");
const attribute_extractor_1 = require("../utils/attribute-extractor");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class ZipCodeController extends abstract_controller_1.AbstractController {
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
    /*** Default factory method.
    */
    static default() {
        return new ZipCodeController(new zip_code_service_1.ZipCodeService());
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    getDistrictsByCepNumber(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        code: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getDistrictsByCepNumber(code));
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
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    getStreetsByCepNumber(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        code: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getStreetsByCepNumber(code));
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
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    getByNumber(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        code: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getByNumber(code));
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
exports.ZipCodeController = ZipCodeController;
exports.default = ZipCodeController;
//# sourceMappingURL=zip-code-controller.js.map